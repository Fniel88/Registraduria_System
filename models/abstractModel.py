from abc import ABCMeta

# Where iter the param that was given in the Model


class AbstractModel(metaclass=ABCMeta):

    def __init__(self, data: dict):
        for key, value in data.items():
            setattr(self, key, value)
