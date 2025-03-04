import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .required('El nombre es obligatorio'),
  apellido: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar los 50 caracteres')
    .required('El apellido es obligatorio'),
  numero: Yup.string()
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .min(8, 'El número debe tener al menos 8 dígitos')
    .max(15, 'El número no puede superar los 15 dígitos')
    .required('El número es obligatorio'),
});

const BasicForm = () => (
  <Formik
    initialValues={{ name: '', apellido: '', numero: '' }}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
        />
        {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={handleChange('apellido')}
          onBlur={handleBlur('apellido')}
          value={values.apellido}
        />
        {touched.apellido && errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Número"
          keyboardType="numeric"
          onChangeText={handleChange('numero')}
          onBlur={handleBlur('numero')}
          value={values.numero}
        />
        {touched.numero && errors.numero && <Text style={styles.errorText}>{errors.numero}</Text>}

        <Button onPress={handleSubmit} title="Enviar" />
      </View>
    )}
  </Formik>
);

export default function App() {
  return (
    <View style={styles.container}>
      <BasicForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
