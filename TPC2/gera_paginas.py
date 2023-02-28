import json
import bisect

def setup_estruturas(mapa):
    nomes_cidades = dict()
    distritos = dict()
    origens = dict()
    destinos = dict()

    ligacoes = mapa["ligações"]
    cidades = mapa["cidades"]
    cidades.sort(key=lambda x : x["nome"])

    for c in cidades:
        if c["distrito"] not in distritos:
            distritos[c["distrito"]] = list()
        distritos[c["distrito"]].append(c)
        nomes_cidades[c["id"]] = c["nome"]


    for l in ligacoes:
        if l["destino"] not in origens:
            origens[l["destino"]] = list() 
        bisect.insort(origens[l["destino"]], (l["origem"], l["distância"]), key=lambda x : nomes_cidades[x[0]])

        if l["origem"] not in destinos:
            destinos[l['origem']] = list()
        bisect.insort(destinos[l['origem']], (l["destino"], l["distância"]), key=lambda x : nomes_cidades[x[0]])

    return distritos, cidades, origens, destinos, nomes_cidades


def gera_pagina_cidade(cidade, origens, destinos, nomes_cidades):
    html = """
    <!DOCTYPE html>

    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <table style="width:100%">
                <tr>
                    <!-- Conteudo-->
                    <td>
    """

    html += f"""
                    <center><h2>{cidade["nome"]}</h2></center>
                    <p><b>População: </b>{cidade["população"]}</p>
                    <p><b>Descricção: </b>{cidade["descrição"]}</p>
                    <p><b>Distrito: </b>{cidade["distrito"]}</p>
                    <table style="width:100%">
                        <td valign="top" width="50%">
                            <center><p><b>Origens:</b></p></center>
                                <ul>
    """

    if cidade["id"] in origens:
        for orig in origens[cidade["id"]]:
            html += f"""
                                    <li><a href="{orig[0]}">{nomes_cidades[orig[0]]}</a> - {orig[1]} km</li>
            """
    
    html += f"""
                                </ul>
                            </td>
                            <td valign="top" width="50%">
                                <center><p><b>Destinos:</b></p></center>
                                <ul>
    """

    if cidade["id"] in destinos:
        for dest in destinos[cidade["id"]]:
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



def gera_index(distritos):
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

def main():
    # Carrega o JSON para memória
    file = open("mapa.json")
    mapa = json.load(file)

    # Prepara as estruturas
    distritos, cidades, origens, destinos, nomes_cidades = setup_estruturas(mapa)

    #Gera a página index.html
    gera_index(distritos)

    #Gera as páginas c##.html
    for c in cidades:
        gera_pagina_cidade(c, origens, destinos, nomes_cidades)

if __name__ == '__main__':
    main()


