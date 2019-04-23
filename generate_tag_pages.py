#!/bin/env python
'''
Auto generate tags modules
'''

import os
import glob
import errno


def get_dir_files(dir_path, recursive=False):
    '''
    :return list of all files in a target directory
    '''
    result = []
    for filename in glob.glob('%s/*' % dir_path):
        if not os.path.islink(filename):
            result.append(filename)
            if os.path.isdir(filename) and recursive:
                result.extend(get_dir_files(filename))
    return result


def mkdir_p(dist_path):
    '''
    create a dir if does not exists
    '''
    try:
        os.makedirs(dist_path)
    except OSError as exc:  # Python > 2.5
        if exc.errno == errno.EEXIST and os.path.isdir(dist_path):
            pass
        else:
            raise


def fill_in_tag_template(tags_dir, tag_name):
    '''
    write in he tag template
    '''
    content = """---
layout: tagpage
tag: {}
---""".format(tag_name)
    file_path = os.path.join(tags_dir, tag_name)
    mkdir_p(file_path)
    with open(os.path.join(file_path, 'index.html'), 'w+') as append_file:
        print('writing to %s' % append_file.name)
        append_file.write(content)


DIST_PATH = '_posts'
FILES_LISTING = get_dir_files(DIST_PATH)
ALL_TAGS = []

for infile in FILES_LISTING:
    with open(infile, 'r') as read_file:
        line = read_file.readline()
        while 'tags' not in line:
            line = read_file.readline()
        ALL_TAGS += line.strip().split(' ')[1:]
print('Tags are: %r' % ALL_TAGS)

for tag in ALL_TAGS:
    fill_in_tag_template('tags', tag)

#  vim: set ft=python ts=4 sw=4 et ai :
