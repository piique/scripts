import os
import sys

# p = Path(some_path)
# p.rename(Path(p.parent, "{}_{}".format(p.stem, 1) + p.suffix))

directory = os.path.dirname(__file__)
print(directory)


def renameGoodVibes():
    _directory = directory + '\\img\\good_vibes\\'
    for file in os.listdir(_directory):
        if (not file.startswith("good")) and (not file.startswith("personal")):
            os.rename(_directory + file, _directory + "good_" + str(file))


def renameBadVibes():
    _directory = directory + '\\img\\bad_vibes\\'
    for file in os.listdir(_directory):
        if (not file.startswith("bad")) and (not file.startswith("personal")):
            os.rename(_directory + file, _directory + "bad_" + str(file))


if sys.argv[1] == 'good':
    renameGoodVibes()
elif sys.argv[1] == 'bad':
    renameBadVibes()
else:
    renameGoodVibes()
    renameBadVibes()
