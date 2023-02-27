import json

f = open("mapa.json")
mapa = json.load(f)

nomes_cidades = dict()
distritos = dict()
origens = dict()
destinos = dict()

ligacoes = mapa["ligações"]
cidades = mapa["cidades"]
cidades.sort(key=lambda x : x["nome"])

for c in cidades:
    nomes_cidades[c["id"]] = c["nome"]

    if c["distrito"] not in distritos:
        distritos[c["distrito"]] = list()
    
    distritos[c["distrito"]].append(c)


for l in ligacoes:
    if l["destino"] not in origens:
        origens[l["destino"]] = list() 
    origens[l["destino"]].append((l["origem"], l["distância"]))

    if l["origem"] not in destinos:
        destinos[l['origem']] = list()
    destinos[l["origem"]].append((l["destino"], l["distância"]))


def gera_pagina_cidade(cidade):
    html = """
    <!DOCTYPE html>

    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <table>
                <tr>
                    <!-- Conteudo-->
                    <td>
    """

    html += f"""
                    <h3>{cidade["nome"]}</h3>
                    <p><b>População: </b>{cidade["população"]}</p>
                    <p><b>Descricção: </b>{cidade["descrição"]}</p>
                    <p><b>Distrito: </b>{cidade["distrito"]}</p>
                    <table>
                        <td valign="top">
                            <p><b>Origens:</b></p>
                                <ul>
    """

    if cidade["id"] in origens:
        for orig in origens[c["id"]]:
            html += f"""
                                    <li><a href="{orig[0]}">{nomes_cidades[orig[0]]}</a> - {orig[1]} km</li>
            """
    
    html += f"""
                                </ul>
                            </td>
                            <td valign="top">
                                <p><b>Destinos:</b></p>
                                <ul>
    """

    if c["id"] in destinos:
        for dest in destinos[c["id"]]:
            html += f"""
                                    <li><a href="{dest[0]}">{nomes_cidades[dest[0]]}</a> - {dest[1]} km</li>
            """


    html += f"""
                                </ul>    
                            </td>
                        </table>
                        <center>
                            <hr width="80%"/>
                        </center>
                    </td>
                </tr>
            </table>
        </body>
    </html>           
    """

    file = open(f"./pages/{cidade['id']}.html", "w")
    file.write(html)
    file.close()



def gera_index():
    distritos_ord = list(distritos.keys())
    distritos_ord.sort()

    html = """
    <!DOCTYPE html>

    <html>
        <head>
            <title>Índice</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <table>
                <tr>
                    <td>
                        <h2>Índice</h4>
                        <ul>
    """

    for distrito in distritos_ord:
        html += f"""
                            <li>
                                <h3>{distrito}</h3>
                                <ul>
        """
        
        for cidade in distritos[distrito]:
            html += f"""
                                    <li><a href="{cidade["id"]}">{cidade["nome"]}</a></li>
            """

        html += """
                                </ul>
                            </li> 
        """
    
    html += """
                        </ul>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    file = open(f"./pages/index.html", "w")
    file.write(html)
    file.close()



gera_index()
for c in cidades:
    gera_pagina_cidade(c)