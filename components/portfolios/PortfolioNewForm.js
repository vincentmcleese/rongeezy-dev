import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'reactstrap';
import PortInput from '../form/PortInput'


const validateInputs = (values) => {
    let errors = {};

    Object.entries(values).forEach(([key, value])=> {
        console.log(key)
        const requiredFields = ['title', 'company']
        if (!values[key] && requiredFields.includes(key)) {
            errors[key] =`${key} is required!`
        }

    })

    return errors;
}

const INITIAL_VALUES = { title: '',
                         company: '', 
                         location: '', 
                         position: '', 
                         description: '', 
                         startDate: '', 
                         endDate: '' }

const PortfolioNewForm = (props) => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" label="Title" component ={PortInput}/>
          <Field type="text" name="company" label="Company" component ={PortInput}/>
          <Field type="text" name="location" label="Location" component ={PortInput}/>
          <Field type="text" name="position" label="Position" component ={PortInput}/>
          <Field type="text" name="description" label="Description" component ={PortInput}/>
          <Field type="text" name="startDate" label="Start Date" component ={PortInput}/>
          <Field type="text" name="endDate" label="End Date" component ={PortInput}/>
          <Button type="Create" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioNewForm;


















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