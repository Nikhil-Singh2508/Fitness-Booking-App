import ClassList from './components/ClassList';
import Booking from './components/Booking';
import BookingList from './components/BookingList';

function App() {
  return (
    <div className='p-20'>
      <h1 className='text-3xl font-bold flex justify-center'>🏋️‍♂️ Fitness Studio Booking</h1>
      <ClassList />
      <hr />
      <Booking />
      <hr />
      <BookingList />
    </div>
  );
}

export default App;
