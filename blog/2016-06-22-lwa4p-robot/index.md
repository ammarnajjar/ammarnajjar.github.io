---
slug: lwa4p-robot
title: Lwa4p Robot Arm Setup
authors: ammarnajjar
date: 2016-06-22 14:43:32 +0200
tags: [lwa4p, robot, moveit, ros]
---

During my experiments with the powerball lightweight [lwa4p robot arm](http://mobile.schunk-microsite.com/en/produkte/products/powerball-lightweight-arm-lwa-4p.html) from Schunk, I faced many difficulties in order to make it move using [moveit](http://moveit.ros.org/). In this post I share this experience.

I collected all the steps needed in one [bash script](https://github.com/ammarnajjar/lwa4p_robot_arm/blob/master/install.sh), and here I am going to go into the details of the process that I followed.

<!-- truncate -->

## Choosing CAN Card/Driver
As lwa4p robot arm uses CAN-bus communication protocol, a CAN card is needed to connect to the arm.
In another [project](http://www.cs.rpi.edu/foswiki/bin/view/RoboticsWeb/PowerballSchunk), Bryant Pong used Peak pcan card from [Peak](http://www.peak-system.com/) which is not available to me, and according to sockercan interface [wiki-page](http://wiki.ros.org/socketcan_interface#Tested_Drivers_and_Devices) I could also use the [esd](https://esd.eu/en) CAN cards with the Kernel driver, and that is what I used.

[Go to Top](#Top)

## Choosing Software Version
First off, is to choose the operating system that I was going to work on. The other [project](http://www.cs.rpi.edu/foswiki/bin/view/RoboticsWeb/PowerballSchunk) uses [ros-hydro](http://wiki.ros.org/hydro), which supports only Precise, Quantal, and Raring for debian packages as stated in the [wiki-page](http://wiki.ros.org/hydro/Installation/Ubuntu#hydro.2BAC8-Installation.2BAC8-Sources.Setup_your_sources.list). So the first idea was to do similar to the mentioned project. Of course dealing with old software draws a lot of troubles, such as the need to install some packages from source as they are not supported in the main software repositories, and one would have to deal with dependencies.

Long story short, it did not work. So I contacted one of the authors of [ipa320/ipa\_canopen](https://github.com/ipa320/ipa_canopen), Mr. Mathias Luedtke [@ipa-mdl](https://github.com/ipa-mdl), who kindly gave me some useful guidelines.

It was suggested to use [ros-industrial/ros\_canopen](https://github.com/ros-industrial/ros_canopen) for it supports [ros-indigo](http://wiki.ros.org/indigo) on [Ubuntu-14.04](http://releases.ubuntu.com/14.04/).
So I ended up with:

- Ubuntu-14.04-64bit
- ROS-Indigo (the most recent update)
- Socketcan (ESD CAN card (PLX90xx), sja1000 kernel driver)
- [Bash](https://www.gnu.org/software/bash/) shell.

[Go to Top](#Top)

## Installing ROS Packages
To install [ROS](http://www.ros.org/), I followed the instructions for the installation mentioned in the [wiki-page](http://wiki.ros.org/action/fullsearch/indigo/Installation/Ubuntu).

- As an administrator or a sudo user, add ROS repositories to the sourcelist and import the appropriate key:

```bash
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net --recv-key 0xB01FA116
```
- Update the cache for packages on the system:

```bash
sudo apt-get update
```
- Install ROS desktop:

```bash
sudo apt-get install -y ros-indigo-desktop
```
- Install other complementary packages:

```bash
sudo apt-get install -y git ros-indigo-libntcan ros-indigo-libpcan       \
        ros-indigo-controller-manager ros-indigo-controller-manager-msgs \
        ros-indigo-joint-limits-interface ros-indigo-cob-srvs            \
        ros-indigo-cob-control-mode-adapter ros-indigo-cob-dashboard     \
        ros-indigo-cob-command-gui libmuparser-dev python-rosinstall     \
        python-wstool
```

[Go to Top](#Top)

## rosdep Initialization
`rosdep` enables you to easily install system dependencies for source you want to compile and is required to run some core components in ROS.

To initialize it:

```bash
sudo rosdep init
rosdep update
```
Note that the second command should be run as a normal user.

[Go to Top](#Top)

## Environment Setup
In order to run any ROS command, ROS environment variables should be available, and this can be done by sourcing specific files:

```bash
echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
Be careful to have that setup file sourced on every terminal you use for ROS, and if you are using [screen](https://www.gnu.org/software/screen/) or [tmux](https://tmux.github.io/), make sure that in every pane you open, every setup file is sourced, else you might get un-expected errors.

[Go to Top](#Top)

## Catkin Workspace
- Create a directory for catkin workspace. Usually I just call it `catkin_ws` and place it in my home directory:

```bash
mkdir -p $HOME/catkin_ws/src
cd $HOME/catkin_ws/src
catkin_init_workspace
```
- Clone the needed packages from github source:

```bash
git clone https://github.com/ammarnajjar/ros_canopen.git -b no-lost-arbitration-handling
git clone https://github.com/ipa320/schunk_robots.git -b indigo_dev
cd ..
```
Notice that I forked the original [ros-industrial/ros_canopen](https://github.com/ros-industrial/ros_canopen) and applied a [patch](https://gist.github.com/ammarnajjar/99c84d31216600d97ce28879e4ac3580) to it, as I kept getting an error:`internal_error: 2 (lost arbitration;)` when I try to initialize the robot arm. If you are curious, have a look at the [complete logs](https://gist.github.com/ammarnajjar/32a3082d75df68a565de1c3b3504ebe2) for the mentioned error.  
The patch is displayed here to show where I commented out handling that error. Do this only if you have to and as a last resort.
<script src="https://gist.github.com/ammarnajjar/99c84d31216600d97ce28879e4ac3580.js"></script>

- Install the dependencies for those packages using:

```bash
rosdep install --from-paths src --ignore-src --rosdistro indigo -y
```
- Build catkin workspace:

```bash
catkin_make
echo "source $HOME/catkin_ws/devel/setup.bash" >> $HOME/.bashrc
source $HOME/catkin_ws/devel/setup.bash
```

[Go to Top](#Top)

## CAN Interface
Setting up the CAN interface correctly came after some research in [ros/socket\_interface](http://wiki.ros.org/socketcan_interface) and with some instructions mentioned in ipa320/schunk\_robots opened [Bug #59](https://github.com/ipa320/schunk_robots/issues/59).

I connect the robot arm to `can0` so the steps can be summarized in the following:

- Set the bitrate to 500k. This has to be done while the interface is down, so first turn it down, set the bitrate value, then turn it up again:

```bash
sudo ip link set dev can0 down
sudo ip link set can0 type can bitrate 500000
sudo ip link set dev can0 up
```

- Set the txqueue length to be between (15-20):

```bash
sudo ifconfig can0 txqueuelen 20
```
Notice that `schunk_robots` package uses `can0` by default, so if you use a different interface such as `can1` or `can2`, make sure to modify the configuration file `lwa4p.yml` in your `schunk_robots` package to make it use the matching CAN interface.

[Go to Top](#Top)

## Moveit
To use [moveit](http://moveit.ros.org/), I followed the steps mentioned in the [docs](http://moveit.ros.org/install/).
I chose the catkin workspace to be in my home directory:

```bash
mkdir -p $HOME/moveit/src
cd $HOME/moveit/src
wstool init .
wstool merge https://raw.github.com/ros-planning/moveit_docs/indigo-devel/moveit.rosinstall
wstool update
cd ..
rosdep install --from-paths src --ignore-src --rosdistro indigo -y
catkin_make
echo "source $HOME/moveit/devel/setup.bash" >> $HOME/.bashrc
source $HOME/moveit/devel/setup.bash
```
At the time when I was using moveit, I faced some compilation [errors](https://gist.github.com/ammarnajjar/6e53d340fc4b6a0afab4de93d46c70d0), but I figured out the problem and made a [pull request](https://github.com/ros-planning/moveit_ros/pull/680) with a suggested solution, and it was merged in no time to ros-planning/moveit-ros [indigo-devel branch](https://github.com/ros-planning/moveit_ros/tree/indigo-devel), and the issue is solved.

After the installation is complete, I used [MoveIt Setup Assistant](http://docs.ros.org/hydro/api/moveit_setup_assistant/html/doc/tutorial.html) to generate the moveit configurations. I did it already myself and put it on [github](https://github.com/ammarnajjar/lwa4p_moveit_config), with all its tweaks.

If you don't want to do it yourself, go to your `src` directory in `catkin` workspace and clone it:

```bash
git clone https://github.com/ammarnajjar/lwa4p_moveit_config.git
```
Then re-build again to be able to use it.

[Go to Top](#Top)

## Initializing the Robot Arm

To initialize the robot arm, I launch the controller first

```bash
roslaunch schunk_lwa4p robot.launch
```

then call the `init` service:

```bash
rosservice call /arm/driver/init
```

This should give the following output:

```log
success: True
message: ''
```

[Go to Top](#Top)

## Moving the Robot Arm

Launch `rviz` and use it to control the robot arm:

```bash
roslaunch lwa4p_movit_config moveit_planning_execution.launch
```

The following images show the robot arm in two different positions:

import lwa4pHome from './lwa4p-home.jpg';
import lwa4pRandomValid from './lwa4p-random-valid.jpg';

 <img src={lwa4pHome} alt="lwa4p-home" height="700" />
*home position*

 <img src={lwa4pRandomValid} alt="lwa4p-home" width="500"/>
*random valid position*

[Go to Top](#Top)

<!--  vim: set ft=markdown ts=4 sw=4 et noai : -->
