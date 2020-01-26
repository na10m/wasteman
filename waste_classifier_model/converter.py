from tensorflow.keras.applications import ResNet50
import tfcoreml

keras_model = ResNet50(weights=None, input_shape=(224, 224, 3))
keras_model.save('./model.h5')

# print input shape
print(keras_model.input_shape)

# get input, output node names for the TF graph from the Keras model
input_name = keras_model.inputs[0].name.split(':')[0]
keras_output_node_name = keras_model.outputs[0].name.split(':')[0]
graph_output_node_name = keras_output_node_name.split('/')[-1]

model = tfcoreml.convert('./model.h5',
                         input_name_shape_dict={input_name: (1, 224, 224, 3)},
                         output_feature_names=[graph_output_node_name],
                         minimum_ios_deployment_target='13')


model.save('./model.mlmodel')
