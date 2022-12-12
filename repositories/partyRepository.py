from models.party import Party
from repositories.interface_repository import InterfaceRepository

# Class where it is calling the interface repository and receive the class Party that after it is going to
# call the AbstractModel


class PartyRepository(InterfaceRepository[Party]):
    pass
