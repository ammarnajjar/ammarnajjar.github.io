import inspect, types

def for_all_methods(decorator):
    def decorate(cls):
        for name, fn in inspect.getmembers(cls):
            if isinstance(fn, types.FunctionType):
                setattr(cls, name, decorator(fn))
        return cls
    return decorate
