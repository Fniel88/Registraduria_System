from models.table import Table
from repositories.interface_repository import InterfaceRepository

# Class where it is calling the interface repository and receive the class Table that after it is going to
# call the AbstractModel


class TableRepository(InterfaceRepository[Table]):
    pass
