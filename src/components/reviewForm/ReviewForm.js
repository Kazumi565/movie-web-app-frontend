import {Form,Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue,submitting = false}) => {
  return (

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} disabled={submitting} />
        </Form.Group>
        <Button variant="outline-info" type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Submit'}</Button>
    </Form>   

  )
}

export default ReviewForm
