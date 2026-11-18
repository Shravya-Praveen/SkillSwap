export const mentors = [
 {id:'maya',name:'Maya Chen',initials:'MC',color:'peach',role:'Product designer · loves a good side project',teaches:['UI/UX Design','Figma'],learns:['Python','Photography'],days:['Sat','Sun'],level:'Intermediate',bio:'Let’s turn a messy idea into a clear, clickable prototype.',project:'Build your first app prototype',icon:'layers'},
 {id:'arjun',name:'Arjun Rao',initials:'AR',color:'lavender',role:'Developer · patient debugging partner',teaches:['Python','Web Development'],learns:['UI/UX Design','Public Speaking'],days:['Wed','Sat'],level:'Beginner friendly',bio:'Small projects, lots of practice, and no such thing as a silly question.',project:'Ship a personal portfolio',icon:'code'},
 {id:'sofia',name:'Sofia Williams',initials:'SW',color:'mint',role:'Visual storyteller · weekend explorer',teaches:['Photography','Video Editing'],learns:['Web Development','Figma'],days:['Sat','Sun'],level:'Beginner friendly',bio:'Make everyday moments look a little more extraordinary.',project:'Create a visual story in 10 frames',icon:'camera'},
 {id:'dev',name:'Dev Patel',initials:'DP',color:'blue',role:'Data enthusiast · explains things simply',teaches:['Data Analysis','Python'],learns:['Photography','UI/UX Design'],days:['Tue','Thu'],level:'Intermediate',bio:'Learn to ask better questions of your data and tell its story.',project:'Make a dashboard from real data',icon:'chart'},
 {id:'nia',name:'Nia Okafor',initials:'NO',color:'rose',role:'Confident communicator · thoughtful listener',teaches:['Public Speaking','Creative Writing'],learns:['Python','Video Editing'],days:['Wed','Sun'],level:'Beginner friendly',bio:'Find your voice through low-pressure practice and useful feedback.',project:'Tell your story in three minutes',icon:'mic'},
 {id:'leo',name:'Leo Martin',initials:'LM',color:'sand',role:'Frontend maker · builds in public',teaches:['Web Development','Figma'],learns:['Data Analysis','Public Speaking'],days:['Fri','Sat'],level:'Intermediate',bio:'Go from a blank file to a website you can be proud to share.',project:'Launch a responsive landing page',icon:'globe'}
];
export const skills = [...new Set(mentors.flatMap(m=>[...m.teaches,...m.learns]))].sort();
export const defaultProfile={name:'Alex',teaches:['Python'],learns:['UI/UX Design'],days:['Sat','Sun'],goal:'Build a portfolio-ready app prototype',level:'Beginner',minutes:30};
export function match(profile,mentor) {
 const learn=mentor.teaches.filter(s=>profile.learns.includes(s));
 const teach=mentor.learns.filter(s=>profile.teaches.includes(s));
 const days=mentor.days.filter(s=>profile.days.includes(s));
 const score=Math.min(100,(learn.length?45:0)+(teach.length?35:0)+(days.length?20:0));
 return {score,learn,teach,days,reasons:[learn.length?`Can teach you ${learn.join(', ')}`:'Offers a skill outside your current goals',teach.length?`Wants to learn your ${teach.join(', ')}`:'Time credits can make this a one-way session',days.length?`Both available ${days.join(' & ')}`:'Arrange a different day together']};
}
export function balance(state){return 120+state.sessions.filter(s=>s.status==='completed'&&s.kind==='teach').reduce((n,s)=>n+s.duration,0)-state.sessions.filter(s=>s.kind==='learn'&&s.status!=='cancelled').reduce((n,s)=>n+s.duration,0);}
export function book(state,session){
 if(![30,45,60].includes(session.duration)) throw Error('Choose a valid session duration.');
 if(!['learn','teach'].includes(session.kind)) throw Error('Choose learning or teaching.');
 if(!Number.isFinite(Date.parse(session.at))||Date.parse(session.at)<=Date.now()) throw Error('Choose a future date and time.');
 if(session.kind==='learn'&&balance(state)<session.duration) throw Error('You need more time credits. Try a shorter session or complete a teaching session.');
 const end=Date.parse(session.at)+session.duration*60000;
 if(state.sessions.some(s=>s.status==='scheduled'&&Date.parse(s.at)<end&&Date.parse(s.at)+s.duration*60000>Date.parse(session.at))) throw Error('This overlaps another session on your calendar.');
 return {...state,sessions:[...state.sessions,{...session,status:'scheduled'}]};
}
export function planFor(profile,goal) {
 const skill=profile.learns[0]||'your chosen skill';
 return `YOUR 4-WEEK LEARNING PLAN\nGoal: ${goal}\nFocus: ${skill} · ${profile.level} · ${profile.minutes} minutes per session\n\nWEEK 1 — Understand the foundations\nAsk a partner to explain three core concepts in ${skill}. Write one example of each in your own words. Spend one session exploring a beginner example related to your goal.\nDeliverable: a one-page concept map.\n\nWEEK 2 — Build a small first attempt\nBreak “${goal}” into three small tasks. Complete the simplest task with your partner, then repeat it independently.\nDeliverable: one small working example or draft.\n\nWEEK 3 — Exchange useful feedback\nShow your work to someone who teaches ${skill}. Ask: What is clear? What is confusing? What should I change first? Apply two improvements.\nDeliverable: a revised version with before-and-after notes.\n\nWEEK 4 — Make it portfolio ready\nFinish a focused version of your project. Explain the problem, your process, and what you learned. Add it to your skill passport.\nDeliverable: a project link and a short reflection.\n\nNEXT SESSION (${profile.minutes} MIN)\n5 min: agree on one outcome.\n${Math.max(10,profile.minutes-15)} min: guided practice.\n5 min: independent attempt.\n5 min: feedback and next step.\n\nLocal planner: this is a structured template, not AI-generated advice.`;
}
