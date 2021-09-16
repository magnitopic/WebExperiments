import requests
import json

peticion=requests.get("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres")
contenido = json.loads(peticion.content)
#print(contenido)  # imprime un fichero JSON enorme
print("Información en tiempo real, última actualización", contenido["Fecha"])
listaEstaciones = contenido["ListaEESSPrecio"]
print("Nº estaciones de servicio en España", len(listaEstaciones))

provincia = "Madrid"                # si ponemos España busca en toda España
producto = "Precio Gasoleo A"                       #producto = "Precio Biodiesel"   #producto = "Precio Gasolina 98 E5"
estacionBarata = {}                                 # inicializamos un diccionario. Buscamos la estación de precio menor
for estacion in listaEstaciones:
    if provincia == "España":                       # Se escribe en capitalize
        if estacion[producto] != "":                # no todas las gasolineras tienen Biodiesel, por ejemplo, asi las quitamos
            if estacionBarata == {}:
                estacionBarata = estacion
            else:
                if estacion[producto] < estacionBarata[producto]:
                    estacionBarata = estacion
    elif provincia.upper() == estacion["Provincia"]:      # filtramos por provincia
        if estacion[producto] != "":
            if estacionBarata == {}:
                estacionBarata = estacion
            else:
                if estacion[producto] < estacionBarata[producto]:
                    estacionBarata = estacion

print("Estación de servicio más económica de", provincia,"para",producto)                    
print(estacionBarata["Rótulo"])                          # mostramos el rótulo de la gasolinera
print(estacionBarata["Dirección"], estacionBarata["C.P."], estacionBarata["Localidad"], estacionBarata["Provincia"])
print(estacionBarata[producto], "€/l")