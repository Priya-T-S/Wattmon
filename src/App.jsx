import React, { useState, useEffect, useRef } from 'react';
import { Zap, TrendingDown, Award, ShoppingCart, Users, Bell, Home, BarChart3, Star } from 'lucide-react';

const WattmonApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [points, setPoints] = useState(1250);
  const [petLevel, setPetLevel] = useState(5);
  const [petHunger, setPetHunger] = useState(65);
  const [petHappiness, setPetHappiness] = useState(80);
  const lottieContainer = useRef(null);
  const animationInstance = useRef(null);
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Living room lights on for 3 hours', time: '2 mins ago' },
    { id: 2, type: 'success', message: 'You saved 500 points today!', time: '1 hour ago' }
  ]);
  
  const [appliances, setAppliances] = useState([
    { id: 1, name: 'Living Room Lights', status: 'on', duration: 180, power: 60, room: 'Living Room' },
    { id: 2, name: 'AC Unit', status: 'on', duration: 120, power: 1500, room: 'Bedroom' },
    { id: 3, name: 'TV', status: 'off', duration: 0, power: 150, room: 'Living Room' },
    { id: 4, name: 'Refrigerator', status: 'on', duration: 1440, power: 150, room: 'Kitchen' },
    { id: 5, name: 'Washing Machine', status: 'off', duration: 0, power: 500, room: 'Utility' }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Sarah M.', petLevel: 8, points: 2450, distance: '120m' },
    { rank: 2, name: 'John D.', petLevel: 7, points: 2100, distance: '340m' },
    { rank: 3, name: 'You', petLevel: 5, points: 1250, distance: '0m', isUser: true },
    { rank: 4, name: 'Emily R.', petLevel: 5, points: 1180, distance: '280m' },
    { rank: 5, name: 'Mike T.', petLevel: 4, points: 980, distance: '450m' }
  ]);

  const [foodItems] = useState([
    { id: 1, name: 'Apple', cost: 50, hunger: 10, happiness: 5, icon: '🍎' },
    { id: 2, name: 'Pizza', cost: 150, hunger: 30, happiness: 20, icon: '🍕' },
    { id: 3, name: 'Cake', cost: 200, hunger: 20, happiness: 35, icon: '🍰' },
    { id: 4, name: 'Salad', cost: 80, hunger: 15, happiness: 10, icon: '🥗' }
  ]);

  const feedPet = (food) => {
    if (points >= food.cost) {
      setPoints(points - food.cost);
      setPetHunger(Math.min(100, petHunger + food.hunger));
      setPetHappiness(Math.min(100, petHappiness + food.happiness));
      
      if (petHunger + food.hunger >= 90 && petHappiness + food.happiness >= 90) {
        setPetLevel(petLevel + 1);
        setNotifications([
          { id: Date.now(), type: 'success', message: `🎉 Your Wattmon evolved to Level ${petLevel + 1}!`, time: 'Just now' },
          ...notifications
        ]);
      }
    }
  };

  const getLottieUrl = () => {
    // Different animations based on pet level
    // You can replace these with your own Lottie animation URLs
    if (petLevel >= 8) return 'https://lottie.host/d7d3a6c8-85c5-4d1e-9c4e-8c3e3e3e3e3e/abcdefghij.json'; // Dragon/Lion
    if (petLevel >= 6) return 'https://lottie.host/embed/4c0d3c3e-3c3e-3c3e-3c3e-3c3e3c3e3c3e/abcdefghij.json'; // Tiger
    if (petLevel >= 4) return 'https://lottie.host/embed/8c3e3c3e-3c3e-3c3e-3c3e-3c3e3c3e3c3e/abcdefghij.json'; // Cat
    return 'https://lottie.host/embed/1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f/abcdefghij.json'; // Baby
  };

  useEffect(() => {
    // Load Lottie library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (lottieContainer.current && window.lottie) {
        // Clear previous animation
        if (animationInstance.current) {
          animationInstance.current.destroy();
        }

        // Load new animation based on level
        animationInstance.current = window.lottie.loadAnimation({
          container: lottieContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: getLottieUrl()
        });
      }
    };

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, [petLevel]);

  const getPetEmoji = () => {
    if (petLevel >= 8) return '🦁';
    if (petLevel >= 6) return '🐯';
    if (petLevel >= 4) return '🐱';
    return '🐣';
  };

  const totalPowerUsage = appliances
    .filter(a => a.status === 'on')
    .reduce((sum, a) => sum + a.power, 0);

  const dailySavings = 320;
  const weeklySavings = 1850;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Wattmon</h1>
              <p className="text-xs text-gray-500">Save Energy, Grow Your Monster</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <Star className="text-white" size={18} />
              <span className="font-bold text-white">{points}</span>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell size={22} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'pet', icon: Star, label: 'My Wattmon' },
              { id: 'shop', icon: ShoppingCart, label: 'Shop' },
              { id: 'leaderboard', icon: Users, label: 'Leaderboard' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Zap className="text-red-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                    Active Now
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{totalPowerUsage}W</h3>
                <p className="text-gray-500 text-sm">Current Power Usage</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <TrendingDown className="text-emerald-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    +15% today
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{dailySavings} pts</h3>
                <p className="text-gray-500 text-sm">Points Earned Today</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Award className="text-purple-600" size={24} />
                  </div>
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    Level {petLevel}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">#{leaderboard.find(l => l.isUser)?.rank || 3}</h3>
                <p className="text-gray-500 text-sm">Local Ranking</p>
              </div>
            </div>

            {/* Notifications */}
            {notifications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Alerts</h2>
                <div className="space-y-3">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        notif.type === 'warning' ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notif.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{notif.message}</p>
                        <p className="text-gray-500 text-sm mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appliances Monitor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Active Appliances</h2>
              <div className="space-y-3">
                {appliances.map(appliance => (
                  <div key={appliance.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${appliance.status === 'on' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{appliance.name}</h3>
                        <p className="text-sm text-gray-500">{appliance.room} • {appliance.power}W</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${appliance.status === 'on' ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {appliance.status === 'on' ? 'ON' : 'OFF'}
                      </p>
                      {appliance.status === 'on' && (
                        <p className="text-sm text-gray-500">{Math.floor(appliance.duration / 60)}h {appliance.duration % 60}m</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pet' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
              <div className="text-center">
                {/* Lottie Animation Container */}
                <div className="flex justify-center mb-4">
                  <div 
                    ref={lottieContainer}
                    className="w-64 h-64 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center"
                  >
                    {/* Fallback emoji while loading */}
                    <div className="text-8xl">{getPetEmoji()}</div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Level {petLevel} Wattmon</h2>
                <p className="text-purple-100">Keep saving energy to help your Wattmon evolve!</p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Hunger</span>
                    <span className="font-bold">{petHunger}%</span>
                  </div>
                  <div className="w-full bg-purple-700/50 rounded-full h-3">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-500"
                      style={{ width: `${petHunger}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Happiness</span>
                    <span className="font-bold">{petHappiness}%</span>
                  </div>
                  <div className="w-full bg-purple-700/50 rounded-full h-3">
                    <div
                      className="bg-yellow-300 rounded-full h-3 transition-all duration-500"
                      style={{ width: `${petHappiness}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Evolution Path</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🐣</div>
                    <div>
                      <p className="font-semibold text-gray-800">Sparklet</p>
                      <p className="text-sm text-gray-500">Level 1-3</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🐱</div>
                    <div>
                      <p className="font-semibold text-gray-800">Voltpaw</p>
                      <p className="text-sm text-gray-500">Level 4-5</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🐯</div>
                    <div>
                      <p className="font-semibold text-gray-800">Thunderclaw</p>
                      <p className="text-sm text-gray-500">Level 6-7</p>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🦁</div>
                    <div>
                      <p className="font-semibold text-gray-800">Megawatt King</p>
                      <p className="text-sm text-gray-500">Level 8+</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">Feed your Wattmon and keep them happy to unlock new evolutions!</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Food Shop</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foodItems.map(food => (
                  <div key={food.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition">
                    <div className="text-5xl mb-3 text-center">{food.icon}</div>
                    <h3 className="font-bold text-gray-800 text-center mb-2">{food.name}</h3>
                    <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                      <span>Hunger +{food.hunger}</span>
                      <span>Happy +{food.happiness}</span>
                    </div>
                    <button
                      onClick={() => feedPet(food)}
                      disabled={points < food.cost}
                      className={`w-full py-3 rounded-xl font-bold transition ${
                        points >= food.cost
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Buy for {food.cost} pts
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-800">Local Leaderboard</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Within 500m</span>
              </div>
              
              <div className="space-y-3">
                {leaderboard.map(user => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl transition ${
                      user.isUser
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-400 text-white' :
                      user.rank === 2 ? 'bg-gray-300 text-white' :
                      user.rank === 3 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-bold ${user.isUser ? 'text-emerald-700' : 'text-gray-800'}`}>
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">Level {user.petLevel} • {user.distance}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{user.points}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">🏆 Weekly Challenge</h3>
              <p className="text-blue-100 mb-4">Top 3 users this week get bonus 500 points!</p>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Time remaining</span>
                  <span className="font-bold">3 days 14h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WattmonApp;