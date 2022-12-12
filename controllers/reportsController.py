from repositories.reportsRepository import ReportsRepository


class ReportsController:
    # Constructor
    def __init__(self):
        self.report_repository = ReportsRepository()
# function that gives a report with the votes per candidate calling the repository

    def get_votes_by_candidate(self):
        return self.report_repository.get_votes_by_candidate()
# function that gives a report with the votes per table calling the repository

    def get_votes_by_table(self) -> list:
        return self.report_repository.votes_by_table()
# function that gives a report with the votes per party calling the repository

    def get_votes_by_party(self) -> list:
        return self.report_repository.get_party_result()
# function that gives a report with a distribution of parties in the government

    def get_percentage_by_party(self) -> list:
        return self.report_repository.get_percentage_by_parties()
