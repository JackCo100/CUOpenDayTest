// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'
import cuLogo from '/cu-logo.svg'

async function loadOpenDay() {
  // Use the correct base path for GitHub Pages
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`)
  const data = await res.json()
  return data
}

function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }
  
  app.innerHTML = `
    
<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="${cuLogo}" alt="Cardiff University Logo" class="h-16 w-auto" />
        </a>
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold text-cardiff-red mb-2 text-center">Cardiff University Open Day</h1>
      <p class=" text-l text-cardiff-dark mb-4">Welcome to the Cardiff University Open Day website, here you can find out about all the events by school across campus.</p>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
        ${data.topics.map((topic: any) => topic && topic.name ? `
          <div class="w-100 p-2">
            <div class="border border-gray-400 p-2">
              <div class="mb-4">
                <img class="h-30 w-30 object-cover" src="${topic.cover_image}" />
                <div class="text-cardiff-red font-bold text-xl mb-2">${topic.name}</div>
                <p class="text-cardiff-dark text-base">${topic.description || ''}</p>
              </div>
              
                ${topic.programs && topic.programs.length ? `
              <h2 class="text-cardiff-red font-bold mb-2"> Event Calendar </h2>
              <table class="table-fixed border-collapse border border-cardiff-light-grey w-full">
                <thead>
                  <tr>
                    <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-4/10">Event Name</th>
                    <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">Start Time</th>
                    <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">End Time</th>
                    <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-2/10">Building Address</th>
                    <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">Room</th>
                  </tr>
                </thead>
                <tbody>
                  ${topic.programs.map((program: any) => program && program.title ? `
                    <tr>
                      <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${program.title}</td>
                      <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${new Date(program.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${new Date(program.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${program.location.title}, ${program.location.address}</td>
                      <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${program.room ? program.room : 'Reception'}</td>
                    </tr>
                    
                  `: '').join('')}
                </ul>
              </div>
            ` : 'No events scheduled!'}
                </tbody>
              </table>
            </div>
          </div>
          ` : '').join('')}
      </div>
    </div>
     
  `
}

loadOpenDay().then(renderOpenDay)
