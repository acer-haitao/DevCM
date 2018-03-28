# -*- coding: utf-8 -*-
# @Time    : 2018/3/28 8:48
# @Author  : HT
# @Email   : acer_yuhaitao@163.com
# @File    : udp.py
# @Software: PyCharm
from socket import *
from time import ctime
import struct

import MySQLdb


def udp():
    Host = '192.168.3.90'
    PORT = 8899
    BUFSZ = 1024
    ADDR = (Host,PORT)
    udpserSock = socket(AF_INET, SOCK_DGRAM)
    udpserSock.bind(ADDR)
    while True:
        data,addr = udpserSock.recvfrom(BUFSZ)
        MAC = data[8:20].decode()#将bytes转换成str
        dev_data = data[20:24]
        dev_float = struct.unpack('<f', struct.pack('4B', *dev_data))[0]
        time = ctime()
        print(MAC,dev_float,ctime())
def add_mysql(MAC,dev_float,time):
    connect = MySQLdb.connect('mysql.litianqiang.com', 'novel', 'qiangzi()', 'test', port=7150, charset="utf8")
    cursor = connect.cursor()
    sql = 'insert into dev()'
    try:
        cursor.execute(sql)
        connect.commit()
    except Exception as e:
        print("SQLERRO", e)
        pass


udp()