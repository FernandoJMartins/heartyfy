import './globals.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

export default function Root() {
  return (


    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Home />

    </div>
  );
}
