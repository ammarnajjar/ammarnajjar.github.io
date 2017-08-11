#!/bin/env python

import os, glob
import errno

def get_dir_files(dir_path, recursive=False):
    result = []
    for f in glob.glob('%s/*' % dir_path):
        if not os.path.islink(f):
            result.append(f)
            if os.path.isdir(f) and recursive:
                result.extend(get_dir_files(f))
    return result

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise

def fill_in_tag_template(tags_dir, tag_name):
    content = """---
layout: tagpage
tag: {}
---""".format(tag_name)
    file_path = os.path.join(tags_dir, tag_name)
    mkdir_p(file_path)
    with open(os.path.join(file_path, 'index.html'), 'w+') as fi:
        print('writing to %s' % fi.name)
        fi.write(content)

path = '_posts'
listing = get_dir_files(path)
all_tags = []

for infile in listing:
    with open(infile, 'r') as fi:
        line = fi.readline()
        while ('tags' not in line):
            line = fi.readline()
        all_tags += line.strip().split(' ')[1:]
print('Tags are: %r' % all_tags)

for tag in all_tags:
    fill_in_tag_template('tags', tag)

#  vim: set ft=python ts=4 sw=4 et ai :
