---
slug: fedora23-upgrade
title: Fedora23 Upgrade (unlabeled home)
authors: ammarnajjar
date: 2016-07-03 17:07:02 +0200
tags: [fedora]
---

When I tried to update from the fedora23 to fedora24, I faced the issue that the `home` directoy lost its labeling:

```bash
> ls -lZ /home/
drwxr-x---. 83 username username system_u:object_r:unlabeled_t:s0   4096 Jun 22 14:55 username
drwx------.  2 root     root     system_u:object_r:lost_found_t:s0  16384 Sep 30 2015 lost+found
drwx------.  5 root     root     system_u:object_r:unlabeled_t:s0   4096 Jan 13 11:48 testuser
```

And the issue prevents the user `username` from logging in to its home directory, instead it directs the user to the root directory with an error message regarding permission issues.

I searched for the solution and found it here in this [helpful answer](http://forums.fedoraforum.org/showpost.php?p=1587276&postcount=2).

The command to re-label the directory is:

```bash
sudo restorecon -R /home
```

After that everythig went ok and logging is back to normal:

```bash
> ls -lZ /home/
drwxr-x---. 83 username username system_u:object_r:user_home_dir_t:s0  4096 Jun 22 14:55 username
drwx------.  2 root     root     system_u:object_r:lost_found_t:s0     16384 Sep 30 2015 lost+found
drwx------.  5 root     root     system_u:object_r:user_home_dir_t:s0  4096 Jan 13 11:48 testuser
```

[Go to Top](#Top)
