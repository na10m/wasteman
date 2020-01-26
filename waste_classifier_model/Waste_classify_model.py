from __future__ import absolute_import, division, print_function, unicode_literals

import numpy as np

import tensorflow as tf
assert tf.__version__.startswith('2')

from tensorflow_examples.lite.model_customization.core.data_util.image_dataloader import ImageClassifierDataLoader
from tensorflow_examples.lite.model_customization.core.task import image_classifier
from tensorflow_examples.lite.model_customization.core.task.model_spec import efficientnet_b0_spec
from tensorflow_examples.lite.model_customization.core.task.model_spec import ImageModelSpec

import matplotlib.pyplot as plt

import os

from time import time

from tensorflow.python.keras.callbacks import TensorBoard

image_path = os.path.join(os.getcwd(), 'dataset-resized')

data = ImageClassifierDataLoader.from_folder(image_path)

train_data, rest_data = data.split(0.8)
validation_data, test_data = rest_data.split(0.5)

##plt.figure(figsize=(10,10))
##for i, (image, label) in enumerate(data.dataset.take(25)):
##  plt.subplot(5,5,i+1)
##  plt.xticks([])
##  plt.yticks([])
##  plt.grid(False)
##  plt.imshow(image.numpy(), cmap=plt.cm.gray)
##  plt.xlabel(data.index_to_label[label.numpy()])
##plt.show()

model = image_classifier.create(train_data, validation_data=validation_data, dropout_rate = 0.2)
model.summary()

loss, accuracy = model.evaluate(test_data)

# A helper function that returns 'red'/'black' depending on if its two input
# parameter matches or not.
def get_label_color(val1, val2):
  if val1 == val2:
    return 'black'
  else:
    return 'red'

# Then plot 100 test images and their predicted labels.
# If a prediction result is different from the label provided label in "test"
# dataset, we will highlight it in red color.
plt.figure(figsize=(20, 20))
predicts = model.predict_top_k(test_data)
for i, (image, label) in enumerate(test_data.dataset.take(100)):
  ax = plt.subplot(10, 10, i+1)
  plt.xticks([])
  plt.yticks([])
  plt.grid(False)
  plt.imshow(image.numpy(), cmap=plt.cm.gray)

  predict_label = predicts[i][0][0]
  color = get_label_color(predict_label,
                          test_data.index_to_label[label.numpy()])
  ax.xaxis.label.set_color(color)
  plt.xlabel('Predicted: %s' % predict_label)
plt.show()


