'''
This module contains some helpful decorators
'''
import inspect
import types


def for_all_methods(decorator):
    '''
    Apply this decorator on all this class methods
    '''
    def decorate(cls):
        '''
        the inner wrapper method
        '''
        for name, method_name in inspect.getmembers(cls):
            if isinstance(method_name, types.FunctionType):
                setattr(cls, name, decorator(method_name))
        return cls
    return decorate
