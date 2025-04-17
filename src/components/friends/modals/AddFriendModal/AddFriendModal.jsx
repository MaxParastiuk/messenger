import { toast } from 'react-toastify';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { useForm } from 'react-hook-form';

const AddFriendModal = ({ sendFriendRequest, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username }) => {
    try {
      await sendFriendRequest(username);
      reset();
      toast.success('Friend request sent!');
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  return (
    <ModalWrapper
      titleId="add-friend-title"
      titleText="Add a Friend"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}

        <button type="submit">Send Request</button>
      </form>
    </ModalWrapper>
  );
};

export default AddFriendModal;
