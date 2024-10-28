FROM nginx:latest

#Define o diretório de trabalho
WORKDIR /usr/share/nginx/html

#Copia os arquivos da pasta dist para o diretório do servidor
COPY calencare/build /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
#Verifica se os arquivos foram copiados corretamente (apenas para fins de depuração)
RUN ls -la

#Expor a porta 80
EXPOSE 80

EXPOSE 443

#Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]