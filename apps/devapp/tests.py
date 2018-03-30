from django.test import TestCase
from socket import *
from time import ctime
# Create your tests here.
def udp():
    Host = '127.0.0.1'
    PORT = 123
    BUFSZ = 1024
    ADDR = (Host,PORT)
    udpserSock = socket(AF_INET, SOCK_DGRAM)
    udpserSock.bind(ADDR)
    while True:
        print("++++++++++++++")
        data,addr = udpserSock.recvfrom(BUFSZ)
        print("%s"%ctime(),data,addr)
udp()