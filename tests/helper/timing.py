import os
import time
import logging

LOG_DIR = 'logs'

if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

logging.basicConfig(filename='%s/log.log' % LOG_DIR, level=logging.DEBUG)

def time_this(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        return_value = func(*args, **kwargs)
        end = time.time()
        logging.warning('%s_%s took %s seconds' % (func.__qualname__, func.__name__, end - start))
        return return_value
    return wrapper


