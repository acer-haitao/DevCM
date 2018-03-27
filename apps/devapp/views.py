import _socket

from django.shortcuts import render
from socket import *
from time import ctime


# Create your views here.
def udp():
    Host = ''
    PORT = 123
    BUFSZ = 1024
    ADDR = (Host,PORT)
    udpserSock = socket(AF_INET, SOCK_DGRAM)
    udpserSock.bind(ADDR)
    while True:
        print("++++++++++++++")
        data,addr = udpserSock.recvfrom(BUFSZ)
        udpserSock.sendto("hello world",addr)
        print("%s"%ctime(),data,addr)
def index(request):
    return render(request,'index.html')