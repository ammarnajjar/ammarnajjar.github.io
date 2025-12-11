---
slug: pyconde-pydata-2019
title: 'PyConDe & PyData 2019'
authors: ammarnajjar
tags: [python]
---
import pyConLogo from './PyConDEPyDataBER.jpg';

[<img src={pyConLogo} alt="pyconde-logo" max-width="700" maxheight="200" width="100%" height="100%" />](https://de.pycon.org/)

I have just came back from [PyConDe & PyData-2019](https://de.pycon.org/), and I would like to share/document my experience there. This is more like a diary than a blog, where I talk about:

- Arriving
- First Day
- Second Day
- Third Day
- Sprint Days

<!-- truncate -->

## Arriving:

I drove about five hours on the 8th of October 2019, a day before the event,
to get a hotel in the neighborhood of the event venue [Kosmos Berlin](https://www.kosmos-berlin.de/).
It is always good to stay near the conference venue, trust me, it is worth it to pay extra just for
this reason alone.

I arrived in the evening, head the shower, then prepared the schedule for talks/tutorials I want to attend to, then went to sleep realy excited for the next day.

## First Day

Doors were supposed to open at 9 am. I walked to the venue (about 5 minutes) to arrive few minute before the openning. They openend on time, and people started comming in. Directly after the main door, there were tables labeled with letters, and one must pick up the enterance padge from there acourding to thier first name letter.
I found this nice and well organized. Thumbs up PyConDe!

After the main door, is a hall, with an open coffee bar in the center, and sponsers booth all around.
Also +1 for the decoration.

Wifi was available for all, and there were a separate wifi for tutorials, where people could `pip install` stuff easily.

I attended:

### Talks:

- Keynote: Ethics with coding: Avery interesting talk about decision making systems, and highly recommended to watch for both technical and non-technical people.
- Developers vs Enterprise: Nice overview about what roles are really involved in big projects,
  how they affect the project goal. If you are already working in a big company/project, this talk would be old news, but if you are not, and want to change jobs to a big company, this is worth watching.
- Running an Open source project: Nice experience overview for a joung maintainer, who started a python library on github, and how she was managing/marketing/developing all at the same time. Recommended if you intend to start something similar. Actually I kinda did similar thigs, except I don't have an idea for a general purpose library.. yet.
- Migrating CPython to github: very interesting to see the challenges of migrating the core development of CPython from whatever they are currently using to github. I would never imagine that there were a core python developer who is not familiar with working with github! I was surprised.

### Tutorials:

- Pandas: little nice intro to [pandas](https://pandas.pydata.org/),
  nothing that I don't already know, but it was nice to work in a small group on the same task.
  I have never done that since college.
- Decorators: also the basics about writing decorators. It was well organized, and the tutor was open to all questions which were really varying from entry to advanced python experience levels. This gives a very nice example on how one should do a tutorial. Well done!

## Second Day

I noticed that there are many cancelled talks this day. Too bad for people applied and didn't get accepted due to amount of applications.
Well they mentioned the reasons behind that the very next morning, and it was mainly due to last minute illness (flu) or hardware breakdown.

I had a very interesting talk with [Łukasz Langa](https://github.com/ambv), the original author of [Black](https://github.com/psf/black), and he handed me over some black stickers in person.

Also [Hynek Schlawack](https://github.com/hynek) was there, and got to give him my feedback related to [attrs](https://github.com/python-attrs/attrs).

I attended:

### Talks:

- Keynote: Python 2020+: very interesting points on how the release manager of CPython 3.8 thinks the development direction should be.
- Docker 101: These were two docker introductory talks, If I knew what was in there, I would not have attended. They coverd the very basics of docker.
- Python panel: alwys very interesting to talk to the core developer, and see how things are seen from the other side of the beloved CPython interpreter development cycle. They encourage and inspire people to contribute to the project.
- Static Typing in Python: nothing really new here, but nice to encourage more people to use type hints.
- The GIL: every now and then the GIL limitation problem rises, and this talk was a very nice investication process by the speaker on how they inspected their multi-threded python code and found out the origin of the problem lying in the GIL.

### Tutorials:

- Introduction to parallelism and concurrency: nice, but the tutor made it to the third slide only 15 min before the end of the session.

## Third Day

I attended:

### Talks:

- Keynote: Rethinking open source: very interesting, I might refer to it when arguing about beinging open source into the interprise someday.
- Pytest: a very basic introduction.
- Pytest: a very instructive talk to show how to try and mimic pytest itself, interesting talk!
- What's new in Python 3.8: self explainatory.
- Your name is invalid: talks about the difficulties people face when interacting with forign systems when it comes to unicode, insightful.
- Python vs R: a nice basic comparision, actually I only attended it for the lack of an interesting talk at that time slot.
- Data visualization: nice intro to two visualization libraries in python.

## Sprint Days

At the night before I checked some of the suggested sprint topics, such as [scikit-learn](https://github.com/scikit-learn/scikit-learn) and [Bokeh](https://github.com/bokeh/bokeh), so I cloned the repos and looked at the open issues.

Sprints started at about 10:00.

At first I met [Stefan Behnel](https://github.com/scoder), the [cython](https://github.com/cython/cython) maintainer, and after a small talk I was curious to see stuff inside cython, then I remembered the famous saying for cython developers: "We write C so you don't have to". So as I am in noway a C fan, I wanted to look into some other stuff.

So I participated in the Bokeh sprint, and for two days, opened two issues, and submitted one [PR](https://github.com/bokeh/bokeh/pull/9276) which got merged fast. We started during the sprint with adding static-typing for the python part, but I didn't make a real deal, so I didn't submit a PR for that change, and just consider it as a training! I learned a lot talking to [Mateusz Paprocki](https://github.com/mattpap) about Bokeh and its infrastructure.

That's how Bokeh sticker made its way to the back of my laptop, in addition to Black!

import bokehLogo from './bokeh_logo.png';
import blackLogo from './black_logo.png';

 <img src={bokehLogo} alt="bokeh-logo" width="100" height="120" />
 <img src={blackLogo} alt="bokeh-logo" width="200" height="100" />

<a href="#" class="go-to-top">Go to Top</a>