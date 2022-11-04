from abc import ABCMeta


class AbstractModel(metaclass=ABCMeta):

    def __int__(self, data: dict):
        for key, value in data.items():
            setattr(self, key, value)
