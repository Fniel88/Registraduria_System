from models.candidate import Candidate
from models.party import Party
from repositories.candidateRepository import CandidateRepository
from repositories.partyRepository import PartyRepository


class CandidateController:
    # Constructor
    def __init__(self):
        """

        :return:
        """
        self.candidateRepository = CandidateRepository()
        self.partyRepository = PartyRepository()
        print("Candidate controller ready...")

    # Function that gives all candidates calling the repository

    def get_all_candidate(self) -> list:
        """
        This method get all the candidates stored in the DB
        :return: list of candidates
        """
        return self.candidateRepository.find_all()

    # Function that gives a candidate calling the repository

    def get_candidate_by_id(self, id_: str) -> dict:
        """
        This method gets one candidate in the DB by providing its id
        :param id_:
        :return: candidate dictionary
        """
        return self.candidateRepository.find_by_id(id_)

    # Function that inserts a candidate calling the repository

    def insert_candidate(self, candidate_: dict) -> dict:
        """
        This method inserts a party in the DB by providing its attributes in a dictionary
        :param candidate_:
        :return: candidate dictionary
        """
        new_candidate = Candidate(candidate_)
        return self.candidateRepository.save(new_candidate)

# Function that updates a candidate calling the repository
    def update_candidate(self, id_: str, candidate_: dict) -> dict:
        """
        This method updates a party in the DB by providing its id and attributes
        :param candidate_:
        :param id_:
        :return: candidate dictionary
        """
        candidate = Candidate(candidate_)
        return self.candidateRepository.update(id_, candidate)

# Function that deletes a candidate calling the repository
    def delete_candidate(self, id_: str) -> dict:
        """
        This method deletes a candidate in the DB by providing its id
        :param id_:
        :return: message: "Delete candidate"
        """
        print("Deleted " + id_)
        return self.candidateRepository.delete(id_)

# Function where relation a candidate to party calling their repositories and transforming obj to dict
    def party_assign(self, candidate_id: str, party_id: str) -> dict:
        candidate_dict = self.candidateRepository.find_by_id(candidate_id)
        candidate_obj = Candidate(candidate_dict)
        party_dict = self.partyRepository.find_by_id(party_id)
        party_obj = Party(party_dict)
        candidate_obj.party = party_obj
        return self.candidateRepository.save(candidate_obj)
