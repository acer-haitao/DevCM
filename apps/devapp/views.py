import _socket

from django.shortcuts import render
from socket import *
from time import ctime


# Create your views here.

def index(request):
    return render(request,'index.html')