(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const a of d.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerPolicy&&(d.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?d.credentials="include":t.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function e(t){if(t.ep)return;t.ep=!0;const d=r(t);fetch(t.href,d)}})();const s="https://jackco100.github.io/CUOpenDayTest/cu-logo.svg";async function c(){return await(await fetch("https://jackco100.github.io/CUOpenDayTest/api/OpenDay.json")).json()}function l(o){const i=document.querySelector("#app");if(!o.topics){i.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}i.innerHTML=`
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
        <img src="${s}" alt="Cardiff University Logo" class="h-16 w-auto" />
      </a>
    </div>
    <h1 class="text-3xl sm:text-5xl font-bold text-cardiff-red mb-2 text-center">Cardiff University Open Day</h1>
    <p class="text-l text-cardiff-dark mb-4">Welcome to the Cardiff University Open Day website, here you can find out about all the events by school across campus.</p>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
      ${o.topics.map(r=>r&&r.name?`
        <div class="w-full p-2">
          <div class="border border-gray-400 rounded-md p-2">
            <div class="mb-4">
              <img class="h-1/3 w-1/2 object-cover mx-auto" src="${r.cover_image}" />
              <div class="text-cardiff-red font-bold text-xl mb-2">${r.name}</div>
              <p class="text-cardiff-dark text-base">${r.description||""}</p>
            </div>
              ${r.programs&&r.programs.length?`
            <h2 class="text-cardiff-red font-bold mb-2"> Event Calendar </h2>
            <table class="table-fixed border-collapse border border-cardiff-light-grey w-full">
              <thead>
                <tr>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-4/10">Event Name</th>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">Start Time</th>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">End Time</th>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-2/10">Building Address</th>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">Room</th>
                  <th class="text-cardiff-red font-bold border-b border-cardiff-light-grey bg-gray-200 w-1/10">Info</th>
                </tr>
              </thead>
              <tbody>
                ${r.programs.map(e=>e&&e.title?`
                  <tr>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${e.title}</td>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${new Date(e.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</td>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${new Date(e.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</td>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${e.location.title}, ${e.location.address}</td>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey">${e.room?e.room:"Reception"}</td>
                    <td class="text-cardiff-dark text-wrap border-b border-cardiff-light-grey"> <button class="btn bg-cardiff-red text-white" onClick="mod${e.id}.showModal()"')">More Info</button> </td>
                  </tr>
                  <dialog id="mod${e.id}">
                    <div class="bg-white p-4">
                      <h2 class="m-4 text-cardiff-red font-bold">${e.title}</h2>
                      <p class="text-cardiff-dark">${e.description}</p>
                      <button onClick="mod${e.id}.close()" class="mt-4 bg-cardiff-dark text-white">Close</button>
                      </div>
                    </dialog>
                `:"").join("")}
              </ul>
            </div>
          `:"No events scheduled!"}
              </tbody>
            </table>
          </div>
        </div>
        `:"").join("")}
    </div>
  </div>
  `}c().then(l);
