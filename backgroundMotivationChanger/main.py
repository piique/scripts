import ctypes
# from posixpath import dirname
import time
import os
import random
import sys

# get the directory path of this script
directory = os.path.dirname(__file__)

defaultWallpaperPath = "C:\Windows\Web\Wallpaper\Theme1\\"
defaultWallpaper = defaultWallpaperPath + "img4.jpg"


def swap(fullPath):
    ctypes.windll.user32.SystemParametersInfoW(20, 0, fullPath, 0)
    # time.sleep(120)
    # ctypes.windll.user32.SystemParametersInfoW(
    #     20, 0, defaultWallpaper, 0)


def getRandomImgPath(vibe):
    imgsPath = directory + "\img\\" + vibe + "\\"
    img = random.choice(os.listdir(imgsPath))
    return imgsPath + img


def getRandomDefaultWallpaperPath():
    img = random.choice(os.listdir(defaultWallpaperPath))
    return defaultWallpaperPath + img


if len(sys.argv) > 1:
    if sys.argv[1] == '-g' or sys.argv[1] == 'good':
        path = getRandomImgPath('good_vibes')
    elif sys.argv[1] == '-b' or sys.argv[1] == 'bad':
        path = getRandomImgPath('bad_vibes')
    elif sys.argv[1] == '-r' or sys.argv[1] == 'random':
        path = getRandomDefaultWallpaperPath()
    elif sys.argv[1] == '-d' or sys.argv[1] == 'default':
        path = defaultWallpaperPath + defaultWallpaper
    else:
        print("Invalid argument")
        exit()

    # print(path)
    swap(path)
else:
    ctypes.windll.user32.SystemParametersInfoW(
        20, 0, defaultWallpaper, 0)
