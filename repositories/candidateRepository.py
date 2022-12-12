from models.candidate import Candidate
from repositories.interface_repository import InterfaceRepository

# Class where it is calling the interface repository and receive the class Candidate that after it is going to
# call the AbstractModel


class CandidateRepository(InterfaceRepository[Candidate]):
    pass
