import requests
# =============Here be create the roles and permission that can have a peron==================
security_backend = "http://127.0.0.1:8080"
headers = {"Content-Type": "application/json; charset=utf-8"}

roles = [
    {"name": "Administrador", "description": "Adminsitrador del servicio de votaciones"},
    {"name": "Jurado", "description": "Apoyo en el conteo de votos"},
    {"name": "Ciudadano", "description": "Persona que vota"}
]

url = f'{security_backend}/rol/insert'
admin = None
for rol in roles:
    response = requests.post(url, headers=headers, json=rol)
    if rol.get('name') == "Administrador":
        admin = response.json()
    print(response.json())
print('='*30)

modules = ['candidate', 'party', 'table', 'result', 'user', 'rol', 'permission']
endpoints = [('s', 'GET'), ('/?', 'GET'), ('/insert', 'POST'), ('/update/?', 'PUT'), ('/delete/?', 'DELETE')]
url = f'{security_backend}/permission/insert'

# Ciclo that iter into a modules and endpoints for getting the correct endpoints that the role going to have

for module in modules:
    for endpoint, method in endpoints:
        permission = f'/{module}{endpoint}'
        body = {
            "url": permission,
            "method": method
        }

        response = requests.post(url, headers=headers, json=body)
        print(response.json())
        data_ = response.json()
        url_relation = f'{security_backend}/rol/update/{admin.get("idRol")}/add_permission/{data_.get("id")}'
        response = requests.put(url_relation, headers=headers)