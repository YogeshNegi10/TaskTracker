import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../main';

const Home = () => {
    const{Authenticated} = useContext(UserContext)

  return (
    
        <div className="bg-gray-100 min-h-screen">
          {/* Hero Section */}
          <section className="text-center py-20 bg-blue-600 text-white">
            <h1 className="text-5xl font-bold">Organize Your Life with Ease</h1>
            <p className="mt-4 text-lg">A simple yet powerful todo app to keep you productive.</p>
            <Link to={Authenticated ? "/projects":'/signup'}><button className=" animate-bounce cursor-pointer mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
             {Authenticated ? 'Lets Go!' : "Get Started"}
            </button>
            </Link>
          </section>
          
          {/* Features Section */}
          <section className="py-16 px-8 text-center">
            <h2 className="text-3xl font-semibold">Why Choose Our App?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-white rounded-lg shadow-md">
              <i class="fa-solid fa-leaf text-9xl mb-2 text-green-400"></i>
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="mt-2 text-gray-600">A user-friendly interface for effortless task management.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
              <i className="fa-solid fa-arrows-rotate text-9xl mb-2 text-blue-600"></i>
                <h3 className="text-xl font-bold">Sync Across Devices</h3>
                <p className="mt-2 text-gray-600">Access your tasks from anywhere, anytime.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
              <i className="fa-solid fa-clock text-9xl mb-2 text-yellow-300"></i>
                <h3 className="text-xl font-bold">Smart Reminders</h3>
                <p className="mt-2 text-gray-600">Never forget a task with our intelligent reminders.</p>
              </div>
            </div>
          </section>
          
          {/* App Screenshot */}
          <section className="text-center py-16">
            <h2 className="text-3xl font-semibold">See It in Action</h2>
            <img src="https://1.bp.blogspot.com/-i78iKr_P9Pk/X9ohjXyc5eI/AAAAAAAAA_4/8UauxZaOgUshGK7MXwW1gZqts7Zrf_AewCLcBGAsYHQ/s1280/Todo%2BList%2BApp%2Busing%2BHTML%2BCSS%2B%2526%2BJavaScript.webp" alt="Todo App Preview" className="mt-6 mx-auto rounded-lg shadow-lg w-3/4" />
          </section>
          
          {/* Signup Section */}
          <section className="py-16 bg-blue-600 text-white text-center">
            <h2 className="text-3xl font-semibold">Stay Updated</h2>
            <p className="mt-2">Sign up to get early access and updates.</p>
            <div className="mt-6 flex justify-center">
              <input type="email" placeholder="Enter your email" className="px-4 py-3 w-64 rounded-l-lg text-black" />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-r-lg shadow-md hover:bg-gray-200">
                Notify Me
              </button>
            </div>
          </section>
        </div>
      );
  
}

export default Home