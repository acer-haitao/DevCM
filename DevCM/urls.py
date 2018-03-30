"""DevCM URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from apps.devapp import views as deviews
from echartapp import views
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^data/(?P<id>\d+)/$', deviews.data),
    url(r'^update/', deviews.update),
    url(r'^pychart3d/$', views.pyechart3d, name='pychart3d'),
    # 使用 echarts.js  渲染，并在 Web 页面展示折线图...
    url(r'^linechart/$', views.linechart, name='linechart'),
    # 使用 echarts.js 渲染，并在 Web 页面展示多维折线图...
    url(r'^multilinechart/$', views.multilinechart, name='multilinechart'),
    # 柱状图
    url(r'^barchart/$', views.barchart, name='barchart'),
    # 饼状图
    url(r'^piechart/$', views.piechart, name='piechart'),
    url(r'^',deviews.index),
]
