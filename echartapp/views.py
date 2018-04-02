# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import math

import MySQLdb
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from pyecharts import Line3D
from pyecharts.constants import DEFAULT_HOST
from devapp.models import dev_data


# 将数据库数据在Web页面展示
from .models import PageViewStatistics

def hdd(request):
    connect = MySQLdb.connect('mysql.litianqiang.com', 'novel', 'qiangzi()', 'test', port=7150, charset="utf8")
    cursor = connect.cursor()
    sql = "select price,sold from hduoduo order by price ASC ;"
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        price = []
        sold = []
        for tmp in result:
            price.append(tmp[0])
            sold.append(tmp[1])
            print(tmp)
    except Exception as e:
        print("SQLERRO", e)
        connect.close()
        pass
    return render(request,'echartapp/hdd.html',context={'price':json.dumps(price),'sold':json.dumps(sold)})

def line3d():
    _data = []
    for t in range(0, 25000):
        _t = t / 1000
        x = (1 + 0.25 * math.cos(75 * _t)) * math.cos(_t)
        y = (1 + 0.25 * math.cos(75 * _t)) * math.sin(_t)
        z = _t + 2.0 * math.sin(75 * _t)
        _data.append([x, y, z])
    range_color = ['#313695', '#4575b4', '#74add1', '#abd9e9', 
                   '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', 
                   '#f46d43', '#d73027', '#a50026']
    line3d = Line3D("3D line plot demo", width=1200, height=600)
    line3d.add("", _data, is_visualmap=True, visual_range_color=range_color,
            visual_range=[0, 30], is_grid3D_rotate=True, grid3D_rotate_speed=180)
    return line3d


def pyechart3d(request):
    '''使用pycharts绘图，使用html5进行渲染...'''
    template = loader.get_template('echartapp/pycharts.html')
    l3d = line3d()
    context = dict(myechart=l3d.render_embed(),
            host=DEFAULT_HOST,
            script_list=l3d.get_js_dependencies()
            )
    # return HttpResponse(template.render(context, request))
    return render(request, 'echartapp/pycharts.html', context)

def linechart(request):
    ''' 绘制折线图... '''
    return render(request, 'echartapp/linechart.html')

def dev(request):
    ''' 绘制折线图... '''
    line_test = dev_data.objects.all().order_by('id')
    up = []
    dev_float = []
    for tmp in line_test:
        up.append(tmp.uptime)
        dev_float.append(tmp.dev_float)
    return render(request, 'echartapp/dev.html', context={"uptime":json.dumps(up), "dev_float":json.dumps(dev_float)})

def multilinechart(request):
    ''' 绘制多维折线图... '''
    pv_statistics = dict()
    datalist = list(PageViewStatistics.objects.values("view_way", "page_views"))
    print(datalist)
    for item in datalist:
        key = item['view_way']
        value = item['page_views']
        if key in pv_statistics.keys():
            (pv_statistics[key]).append(value)
        else:
            pv_statistics[key] = [value]
    print(pv_statistics)
    context = {'data_dict': pv_statistics}
    return render(request, 'echartapp/multilinechart.html', context=context)

def barchart(request):
    ''' 绘制柱状图 '''
    return render(request, 'echartapp/barchart.html')

def piechart(request):
    return render(request, 'echartapp/piechart.html')
