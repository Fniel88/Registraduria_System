from models.result import Result
from repositories.interface_repository import InterfaceRepository

# Class where it is calling the interface repository and receive the class Result that after it is going to
# call the AbstractModel


class ResultRepository(InterfaceRepository[Result]):
    pass
