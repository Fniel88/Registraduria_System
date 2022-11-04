from models.candidate import Candidate
from repositories.candidateRepository import CandidateRepository


class CandidateController:
    def __init__(self):
        print("Candidate controller ready...")
        self.candidate_repository = CandidateRepository

    def index(self) -> list:
        print("Get all candidates")
        return self.candidate_repository.find_all()

    def show(self, id_: str) -> Candidate:
        print("show candidates by ID")
        return self.candidate_repository.find_by_id(id_)

    def create(self, candidate_: dict) -> dict:
        print("insert a candidate")
        candidate = Candidate(candidate_)
        return self.candidate_repository.save(candidate)

    def update(self, id_, candidate_: dict) -> dict:
        print("update a candidate")
        candidate = Candidate(candidate_)
        return self.candidate_repository.update(id_, candidate)

    def delete(self, id_: str) -> str:
        print("delete a candidate" + id_)
        return self.candidate_repository.delete(id_), {"Delete count": 1}
