FROM nginx:latest

#Define o diretório de trabalho
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
#Copia os arquivos da pasta dist para o diretório do servidor
COPY /calencare/build .
#COPY nginx.conf /etc/nginx/sites-available/default

#Verifica se os arquivos foram copiados corretamente (apenas para fins de depuração)
RUN ls -la

#Expor a porta 80
EXPOSE 80
EXPOSE 808
EXPOSE 443

#Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]