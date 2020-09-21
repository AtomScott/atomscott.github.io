---
layout: project
title: 'PySubspace'
date: 1 May 2020
image: /assets/img/projects/PySubspace.jpg
screenshot: /assets/img/projects/PySubspace.jpg
links:
  - title: Website
    url: https://pysubspace.readthedocs.io/en/latest/
caption: Subspace Method in Python!
description: >
  Updated repository of CVLAB toolbox, which contains various subspace methods for classification.
accent_color: '#4fb1ba'
# accent_image:
#   background: 'linear-gradient(to bottom,#193747 0%,#233e4c 30%,#3c929e 50%,#d5d5d4 70%,#cdccc8 100%)'
#   overlay:    true
---

All of the code is from the Computer Vision Laboratory (CVLAB), Graduate school of Systems and Information Engineering, University of Tsukuba ([web](https://en.home.cvlab.cs.tsukuba.ac.jp)). Please check the [github repo](https://github.com/ComputerVisionLaboratory/cvlab_toolbox) for individual credits.

Below is the command to install with pip. 

```bash
    pip install -U git+https://github.com/ComputerVisionLaboratory/cvlab_toolbox
```

We use a Scikit-learn API so it should be pretty easy to get your code up and running. Here's an example that should work copy&paste.

```python
    import numpy as np
    from numpy.random import randint, rand
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score
    from cvt.models import KernelMSM

    dim = 100
    n_class = 4
    n_train, n_test = 20, 5

    # input data X is *list* of vector sets (list of 2d-arrays)
    X_train = [rand(randint(10, 20), dim) for i in range(n_train)]
    X_test = [rand(randint(10, 20), dim) for i in range(n_test)]

    # labels y is 1d-array
    y_train = randint(0, n_class, n_train)
    y_test = randint(0, n_class, n_test)

    model = KernelMSM(n_subdims=3, sigma=0.01)
    model.fit(X_train, y_train)
    pred = model.predict(X_test)

    print(accuracy_score(pred, y_test))
```