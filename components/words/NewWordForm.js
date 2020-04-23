import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, FormGroup, Label, Input } from 'reactstrap';



const validateInputs = (values) => {
    let errors = {};

    Object.entries(values).forEach(([key, value])=> {
        console.log(key)
        const requiredFields = ['word']
        if (!values[key] && requiredFields.includes(key)) {
            errors[key] =`${key} is required!`
        }
    })

    return errors;
}

const INITIAL_VALUES = { word: '' }

const NewWordForm = (props) => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label>Add a new word:</Label>
            <Field className="form-control" type="text" name="word" />
          </FormGroup>
          <Button type="Create">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default NewWordForm;


















// import React from 'react'

// export default class PortfolioNewForm extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//           title: '',
//           description: '',
//           language: ''
//         };
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({[event.target.name]: event.target.value});
//     }
  
//     handleSubmit(event) {
//       alert('A portfolio was submitted: ' + this.state.title + ' ' + this.state.description + ' ' + this.state.language );
//       event.preventDefault();
//     }
  
//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Title:
//             <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
//           </label>
//           <label>
//             Description:
//             <input name="description" type="text" value={this.state.description} onChange={this.handleChange} />
//           </label>
//           <label>
//             Pick your favorite programming language:
//             <select name="language" value={this.state.language} onChange={this.handleChange}>
//                 <option value="javascript">javascript</option>
//                 <option value="java">java</option>
//                 <option value="C++">C++</option>
//                 <option value="C#">C#</option>
//             </select>
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//       );
//     }
//   }