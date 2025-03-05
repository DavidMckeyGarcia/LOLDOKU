// Function to initialize tooltips for grid headers
function initializeTooltips() {
    const colHeaders = document.querySelectorAll('.grid-header[data-type="col"]');
    const rowHeaders = document.querySelectorAll('.grid-header[data-type="row"]');
    const rankHeader = document.querySelector('.grid-header[data-type="rank"]');
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    // Add event listeners to column headers
    colHeaders.forEach((header) => {
      header.addEventListener('mouseenter', (e) => showTooltip(e, header));
      header.addEventListener('mouseleave', hideTooltip);
    });
    
    // Add event listeners to row headers
    rowHeaders.forEach((header) => {
      header.addEventListener('mouseenter', (e) => showTooltip(e, header));
      header.addEventListener('mouseleave', hideTooltip);
    });
    
    // Add event listener to rank header
    if (rankHeader) {
      rankHeader.addEventListener('mouseenter', (e) => showTooltip(e, rankHeader));
      rankHeader.addEventListener('mouseleave', hideTooltip);
    }
    
    // Function to show tooltip
    function showTooltip(event, element) {
      const tooltipContent = element.getAttribute('data-tooltip-content');
      const tooltipTitle = element.getAttribute('data-tooltip-title');
      const tooltipImage = element.getAttribute('data-tooltip-image');
      
      if (!tooltipContent && !tooltipTitle && !tooltipImage) return;
      
      // Build the tooltip HTML
      let tooltipHTML = '';
      
      // Add title if present
      if (tooltipTitle) {
        tooltipHTML += `<div class="tooltip-title">${tooltipTitle}</div>`;
      }
      
      // Create content container
      tooltipHTML += '<div class="tooltip-content-container">';
      
      // Add image if present
      if (tooltipImage) {
        tooltipHTML += `<div class="tooltip-image"><img src="${tooltipImage}" alt="Tooltip image"></div>`;
      }
      
      // Add content text if present
      if (tooltipContent) {
        tooltipHTML += `<div class="tooltip-text">${tooltipContent}</div>`;
      }
      
      // Close content container
      tooltipHTML += '</div>';
      
      tooltip.innerHTML = tooltipHTML;
      tooltip.style.display = 'block';
      
      // Position the tooltip to the right of the element
      const rect = element.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Calculate positions
      const left = rect.right + 10;
      
      // Vertically center the tooltip with the header
      const top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
      
      // Apply positions with scroll offsets to handle scrolling
      tooltip.style.left = left + window.scrollX + 'px';
      tooltip.style.top = top + window.scrollY + 'px';
      
      // Make sure tooltip doesn't go off screen
      const rightEdge = left + tooltipRect.width;
      if (rightEdge > window.innerWidth) {
        // Place tooltip to the left of the element instead
        tooltip.style.left = (rect.left - tooltipRect.width - 10) + window.scrollX + 'px';
      }
    }
    
    // Function to hide tooltip
    function hideTooltip() {
      tooltip.style.display = 'none';
    }
}

  
function updateHeaders(puzzleData) {
    const rows = puzzleData.rows;
    const cols = puzzleData.cols;
    const rank = puzzleData.difficulty;
  
    const colHeaders = document.querySelectorAll('.grid-header[data-type="col"]');
    const rowHeaders = document.querySelectorAll('.grid-header[data-type="row"]');
    const rankHeaders = document.querySelectorAll('.grid-header[data-type="rank"]');
  
    // Update column headers with images and text
    colHeaders.forEach((header, index) => {
      if (cols[index]) {
        // Clear previous content
        header.innerHTML = '';
        
        // Create and add the image
        const img = document.createElement('img');
        img.src = `images/headers/${cols[index].toLowerCase()}.webp`; 
        img.alt = cols[index];
        img.classList.add('column-image');
        
        // Create and add the text
        const text = document.createElement('div');
        text.textContent = cols[index].toUpperCase();
        text.classList.add('header-text');
        
        // Add elements to header
        header.appendChild(img);
        header.appendChild(text);


        // Set tooltip title, content, and image based on the column type
        let tooltipTitle = '';
        let tooltipContent = '';
        let tooltipImage = '';
        
        switch(cols[index].toLowerCase()) {
        case 'freljord':
            tooltipTitle = 'THE FRELJORD';
            tooltipContent = 'The Freljord is a harsh and unforgiving place—where the people are born warriors, who must persevere against all odds. Proud and fiercely independent, the tribes of the Freljord are often considered wild, rugged, and “uncivilized” by their neighbors across Valoran, who do not know the ancient traditions that shaped them.'.italics();

            tooltipImage = 'images/tooltips/freljord.png'; 
            break;
        case 'demacia':
            tooltipTitle = 'DEMACIA';
            tooltipContent = 'A strong, lawful kingdom with a prestigious military history, Demacias people have always valued the ideals of justice, honor, and duty most highly, and are fiercely proud of their cultural heritage.'.italics();
            tooltipImage = 'images/tooltips/demacia.png';
            break;
        case 'zaun':
            tooltipTitle = 'ZAUN';
            tooltipContent = 'Zaun is a large, undercity district, lying in the deep canyons and valleys threading Piltover. What light reaches below is filtered through fumes leaking from the tangles of corroded pipework and reflected from the stained glass of its industrial architecture.'.italics();
            tooltipImage = 'images/tooltips/zaun.png';
            break;
        case 'piltover':
            tooltipTitle = 'PILTOVER';
            tooltipContent = "Piltover, also known as the City of Progress, is a thriving, progressive city whose power and influence is on the rise. It is Valoran's cultural center, where art, craftsmanship, trade and innovation walk hand in hand.".italics();
            tooltipImage = 'images/tooltips/piltover.png';
            break;
        case 'noxus':
            tooltipTitle = 'NOXUS';
            tooltipContent = "Noxus is a powerful empire with a fearsome reputation. To those beyond its borders, it is brutal, expansionist, and threatening, yet those who look past its warlike exterior see an unusually inclusive society, where the strengths and talents of its people are respected and cultivated.".italics();
            tooltipImage = 'images/tooltips/noxus.png';
            break;
        case 'targon':
            tooltipTitle = 'TARGON';
            tooltipContent = "Like any place of myth, Mount Targon is a beacon to dreamers, madmen and questors of adventure. A mountainous and sparsely inhabited region to the west of Shurima, Targon boasts the tallest peak in Runeterra.".italics();
            tooltipImage = 'images/tooltips/targon.png';
            break;
        case 'bilgewater':
            tooltipTitle = 'BILGEWATER';
            tooltipContent = "Nestled away in the Blue Flame Isles archipelago, Bilgewater is a port city like no other—home to serpent hunters, dock gangs, and smugglers from across the known world. Here, fortunes are made and ambitions shattered in the blink of an eye.".italics();
            tooltipImage = 'images/tooltips/bilgewater.png';
            break;
        case 'ixtal':
            tooltipTitle = 'IXTAL';
            tooltipContent = "Renowned for its mastery of elemental magic, Ixtal was one of the first independent nations to join the Shuriman empire. Now, secluded deep in the jungle for thousands of years, the sophisticated arcology-city of Ixaocan remains mostly free of outside influence.".italics();
            tooltipImage = 'images/tooltips/ixtal.png';
            break;
        case 'ionia':
            tooltipTitle = 'IONIA';
            tooltipContent = "Surrounded by treacherous seas, Ionia is composed of a number of allied provinces scattered across a massive archipelago, known to many as the First Lands. Since Ionian culture has long been shaped by the pursuit of balance in all things, the border between the material and spirit realms tends to be more permeable here, especially in the wild forests and mountains.".italics();
            tooltipImage = 'images/tooltips/ionia.png';
            break;
        case 'shadow isles':
            tooltipTitle = 'SHADOW ISLES';
            tooltipContent = "This cursed land was once home to a noble, enlightened civilization, known to its allies and emissaries as the Blessed Isles. However, more than a thousand years ago, an unprecedented magical cataclysm left the barrier between the material and spirit realms in tatters, effectively merging the two… and dooming all living things in an instant.".italics();
            tooltipImage = 'images/tooltips/shadow isles.png';
            break;
        case 'shadow isles':
            tooltipTitle = 'SHADOW ISLES';
            tooltipContent = "This cursed land was once home to a noble, enlightened civilization, known to its allies and emissaries as the Blessed Isles. However, more than a thousand years ago, an unprecedented magical cataclysm left the barrier between the material and spirit realms in tatters, effectively merging the two and dooming all living things in an instant.".italics();
            tooltipImage = 'images/tooltips/shadow isles.png';
            break;
        case 'the void':
            tooltipTitle = 'THE VOID';
            tooltipContent = "Screaming into existence with the birth of the universe, the Void is a manifestation of the unknowable nothingness that lies beyond. It is a force of insatiable hunger, waiting through the eons until its masters, the mysterious Watchers, mark the final time of undoing.".italics();
            tooltipImage = 'images/tooltips/the void.png';
            break;
        case 'shurima':
            tooltipTitle = 'SHURIMA';
            tooltipContent = "The empire of Shurima was once a thriving civilization that spanned an entire continent. Forged in a bygone age by the mighty god-warriors of the Ascended Host, it united all the disparate peoples of the south, and enforced a lasting peace between them.".italics();
            tooltipImage = 'images/tooltips/shurima.png';
            break;
        case 'bandle city':
            tooltipTitle = 'BANDLE CITY';
            tooltipContent = "In Bandle City, it is said that every sensation is heightened for non-yordles. Colors are brighter. Food and drink intoxicates the senses for years and, once tasted, will never be forgotten. The sunlight is eternally golden, the waters crystal clear, and every harvest brings a fruitful bounty.".italics();
            tooltipImage = 'images/tooltips/bandle city.png';
            break;
        case 'fear':
            tooltipTitle = 'FEAR';
            tooltipContent = "A unit that is fleeing or " + "feared ".bold() + " is forced to move directly away from the unit that casted the spell. Feared units are unable to perform issued movement commands, declare attacks, cast abilities, activate items or use the summoner spells.";
            tooltipImage = 'images/tooltips/fear.png';
            break;
        case 'slow':
            tooltipTitle = 'SLOW';
            tooltipContent = "A unit that is " + "slowed".bold() + " has reduced movement speed for the duration. Slow percentages cannot reduce a target below 110 movement speed. Some slows will instead modify the target's movement speed to a static value, which may not be further reduced nor increased.";
            tooltipImage = 'images/tooltips/slow.png';
            break;
        case 'root':
            tooltipTitle = 'ROOT';
            tooltipContent = "A unit that is " + "rooted ".bold() + " is unable to control its movement or activate movement spells for the duration. Movement spells include all dash and blink abilities - including recalling and the summoner spells Flash, Teleport and Hexflash, plus a number of additional cases.";
            tooltipImage = 'images/tooltips/root.png';
            break;
        case 'stun':
            tooltipTitle = 'STUN';
            tooltipContent = "A unit that is " + "stunned".bold() + " is unable to control its movement, declare attacks, cast abilities, activate items or use the summoner spells summoner spells for the duration. Note that a unit that is suspended is also stunned"
            tooltipImage = 'images/tooltips/stun.png';
            break;
        case 'knock-up':
            tooltipTitle = 'KNOCK UP';
            tooltipContent = "A unit that is "+ "knocked airborne".bold() +" undergoes a forced displacement in a specified direction, to a specific point, or for a set duration at its current location, during which it is also unable to control its movement, declare attacks, cast abilities, activate items or use the summoner spells Flash, Hexflash or Teleport.";
            tooltipImage = 'images/tooltips/knockup.png';
            break;
        case 'silence':
            tooltipTitle = 'SILENCE';
            tooltipContent = "A unit that is " + "silenced".bold() + " is unable to cast abilities, activate items or use the summoner spells Flash, Teleport and hexflash. A unit that is polymorphed is silenced and turned into a helpless critter.";
            tooltipImage = 'images/tooltips/silence.png';
            break;
        case 'yordle':
            tooltipTitle = 'YORDLE';
            tooltipContent = 'The Yordle are a race of spirits who generally take the appearance of mammalian bipeds. They mostly reside in a mystical place known as Bandle City, though some of them have ventured out to live in numerous locations around Runeterra.';
            tooltipImage = 'images/tooltips/yordle.png';
            break;
        case "darkin":
            tooltipTitle = 'DARKIN';
            tooltipContent = "Darkin are corrupted God-Warriors who were traumatized by the horrors of the Void War as well as self infliction by the use of blood magic. Currently, all known Darkin have been imprisoned in weapons, unable to ever regain their original Ascended forms.";
            tooltipImage = 'images/tooltips/darkin.png';
            break;
        case "ascended":
            tooltipTitle = 'ASCENDED';
            tooltipContent = "The umbrella term Ascended refers to all humans who were magically altered by a variety of magic, chiefly celestial magic. After their ascension, the Ascended can channel celestial magic through their connection to celestial entities, but do not gain celestial magic themselves.";
            tooltipImage = 'images/tooltips/ascended.png';
            break;
        case "vastayan":
            tooltipTitle = 'VASTAYAN';
            tooltipContent = "The Vastaya are a chimeric race of Runeterra that are the weaker magical descendants from enlightened mortals that took the power of the spirit realm into themselves known as the Vastayashai'rei.";
            tooltipImage = 'images/tooltips/vastayan.png';
            break;
        case "celestial":
            tooltipTitle = 'CELESTIAL';
            tooltipContent = "The umbrella term Celestial refers to all the beings that originate from the celestial realm beyond Runeterra. They were among the first beings that came to be in the universe and are alien in comparison to the physical and spiritual realms."; 
            tooltipImage = 'images/tooltips/celestial.png';
                break;
        case "ult reset":
            tooltipTitle = 'ULTIMATE RESET';
            tooltipContent = "A champion whose ultimate ability cooldown is " +"refunded".bold() +" or its " +"duration increased/extended".bold() +" when scoring a" +"champion takedown. ".bold()+ "Ultimate resets are one of the best ways to get pentakills!";
            tooltipImage = 'images/tooltips/reset.png';
            break;
        case "manaless":
            tooltipTitle = 'MANALESS';
            tooltipContent = "A " +"manaless ".bold() + " champion does not use nor benefit from mana or mana regeneration. There are a number of alternative mechanics that gate the availability of or empower a champion's abilities such as Energy, Fury or Heat.";
            break;
        case "infinite":
            tooltipTitle = 'INFINITE SCALING';
            tooltipContent = "There are some champions in league of legends that can stack an effect infinitely, effectively meaning that they can gain an arbitrary number of one or more stats such as health, resistances, damage or other.";
            break;
        case "100% ap ratio":
            tooltipTitle = '100%+ AP RATIO';
            tooltipContent = "Champions who have an ability that scales by 100% Ability Power (AP) or higher. Note that abilities that do damage over time (tick damage) or burn damage are not counted even if the maximum damage output would exceed 100%. ";
            break;
        case "riot records":
            tooltipTitle = 'RIOT RECORDS';
            tooltipContent = "Riot Games has produced a variety of music for League of Legends and its other games. In League of Legends, alternate universes exist where some champions are part of a band such as Pentakill, K/DA, True Damage and Heartsteal. ";
            tooltipImage = 'images/tooltips/riot records.png';  
            break;
        case "arcane":
            tooltipTitle = "ARCANE CHAMPIONS";
            tooltipContent = "Arcane is an animated action-adventure series set in the cinematic universe of League of Legends. It was produced by the French animation studio Fortiche under the supervision of Riot Games and was distributed by Netflix.";
            tooltipImage = 'images/tooltips/arcane.png';    
            break
        case "not played":
            tooltipTitle = "NOT PLAYED BY FAKER";
            tooltipContent = "Lee " +"Faker".bold() +" Sang-hyeok is a League of Legends esports player, currently mid laner and part owner at T1. He has played over "+ "1400".bold()+ " professional league of legends game since 2013, by far the most out of any other pro player";
            tooltipImage = 'images/tooltips/faker.png';    
            break
        case "tether":
            tooltipTitle = "TETHER";
            tooltipContent = "A tether is an effect that creates a link between the source and the target(s) whose power can be dependent on the effective range and/or time linked. The link is broken beyond a maximum range or if either the source or the target(s) dies."; 
            break       
        case "immunity":
            tooltipTitle = "Immunity / Untargatability";
            tooltipContent = "A champion who is "+ "Immune ".bold() + "will ignore any sources of damage or crowd control that otherwise would normally apply damage. A champion who is " + "Untargatable ".bold() + " is only an invalid target to targeted effects that would otherwise normally apply damage or crowd control." ;
            break 
        case "shred":
            tooltipTitle = "RESISTANCES SHRED";
            tooltipContent = "Armor ".bold() + "or "+ "Magic".bold() +" resistance shred is a "+ "debuff".bold() + " given to a champion, minion or monster that negatively impacts their combat resistances. Shred can cause a units total Armor or Magic resistance to be reduced by a "+ "flat ".bold()+ "or"+ " %".bold()+ " ammount. " ;
            tooltipImage = 'images/tooltips/shred.png'; 
            break 
        default:
            console.log(cols[index])
            tooltipTitle = cols[index];
            tooltipContent = `BROKEN BROKEN`;
            tooltipImage = `images/tooltips/default_tooltip.png`;
        }
        
        header.setAttribute('data-tooltip-title', tooltipTitle);
        header.setAttribute('data-tooltip-content', tooltipContent);
        header.setAttribute('data-tooltip-image', tooltipImage);
      }
    });

  
     // Update row headers with images and text
     rowHeaders.forEach((header, index) => {
        if (rows[index]) {
          // Clear previous content
          header.innerHTML = '';
          
          // Create and add the image
          const img = document.createElement('img');
          img.src = `images/headers/${rows[index].toLowerCase()}.webp`;
          img.alt = rows[index];
          img.classList.add('row-image');
          
          // Create and add the text
          const text = document.createElement('div');
          text.textContent = rows[index].toUpperCase();
          text.classList.add('header-text');
          text.style.fontWeight = 'bold';
          text.style.marginTop = '5px';
          
          // Add elements to container
          header.appendChild(img);
          header.appendChild(text);

        // Set tooltip title, content, and image based on the row type (champion class)
        let tooltipTitle = '';
        let tooltipContent = '';
        let tooltipImage = '';
        
        switch(rows[index].toLowerCase()) {
        case 'jungle':
            tooltipTitle = 'JUNGLE';
            tooltipContent = "Within a drafted team, the Jungler is the unique role not assigned to a lane and instead focuses on clearing jungle camps for gold and experience. They also use the Smite summoner spell which is important for securing neutral objectives on summoners rift.";
            tooltipImage = 'images/tooltips/jungle.png';
            break;
        case 'support':
            tooltipTitle = 'SUPPORT';
            tooltipContent = "Within a drafted team, the " + "support".bold() +" is one half of the duo partnership assigned to the bottom lane. Support champions can fill many different roles from frontline, utility and damage.";
            break;
        case 'adc':
            tooltipTitle = 'ADC/APC';
            tooltipContent = "Within a drafted team, the " + "ADC".bold() +" (Attack Damage Carry) or " + "APC".bold() +" (Ability Power Carry) is one half of the duo partnership assigned to the bottom lane. As the name suggests, this role focuses on champions who can output consistent damage.";
            break;
        case 'mid':
            tooltipTitle = 'MID';
            tooltipContent = "Within a drafted team, the " + "Mid Laner".italics() +" is the player assigned to the middle lane. Mid lane champions can be varied although they mainly focus on high damge or high utility champions";
            break;
        case 'top':
            tooltipTitle = 'TOP';
            tooltipContent = "Within a drafted team, the " + "Top Laner".italics() +" is the champion assigned to the top lane. Top lane champions typically provide some frontline and utility, although can also focus on more damage oriented champions.";
            break;
        case 'worlds':
            tooltipTitle = 'WORLDS SKIN';
            tooltipContent = "Worlds Skins are special limited edition skins released for champions chosen by the players on the " + "World's Championship's".italics() +" winning team. The players also play a role in designing thier skin's appearance and the overall team theme, often including personal references in their skin. ";
            tooltipImage = 'images/tooltips/worlds.png';
            break;
        case 'dash':
            tooltipTitle = 'DASH';
            tooltipContent = "A " + "dash".bold() +" is a type of champion ability in League of Legends that causes the caster to move to a location or in a direction while traversing the intervening distance. This is distinct from blinks, which describe instantaneous movement from one location to another.";
            break;
        case 'global':
            tooltipTitle = 'GLOBAL ULT';
            tooltipContent = "Global Ultimates are characterized by spells which have a range of" + "at least 3000 units.".bold() + " For reference, 3000 units is roughly the distance from the nexus to a Tier 2 turret.";
            tooltipImage = 'images/tooltips/global.png';
            break;
        case 'invis':
            tooltipTitle = 'invisibilty';
            tooltipContent = "Stealth/invisibility refers to various positive effects that temporarily conceal a unit from enemies sight regardless of the Fog of War. If a unit is hit by a damaging ability while stealthed (even if the ability deals no damage), their silhouette's position shimmers for 0.6 seconds.";
            tooltipImage = 'images/tooltips/stealth.png';
            break;
        case 'blink':
            tooltipTitle = 'BLINK';
            tooltipContent = "A " + "blink".bold() +" is a type of spell in League of Legends that causes the caster to move to a target location or unit instantaneously without traversing the space between.";
            break;
        case 'shield':
            tooltipTitle = 'SHIELD';
            tooltipContent = ' Shields are an addition of hit-points that absorb damage in place of actual  health. This distinction separates the amount from calculation by health based effects. They may persist on the recipient to absorb a set amount of damage (shield strength) and/or until the duration runs out (shield duration).';
            tooltipImage = 'images/tooltips/shield.png';
            break;
        case 'life steal':
            tooltipTitle = 'LIFE STEAL / VAMP';
            tooltipContent = "Life steal".bold()+  " or "+ " Vamp ".bold() +"(includes Omnivamp & Physical Vamp) is defined as any damaging spell that heals the caster for a "+ "% of damage dealt.".bold() +" It does not count any attacks that heal the caster for a " + "flat ".bold() +" amount (i.e heals).";
            break
        case 'project':
            tooltipTitle = 'PROJECT SKINLINE';
            tooltipContent = "PROJECT is a series of alternate future/universe skins in League of Legends. Set in The City of a Cyberpunk world, it features champions as humans augmented by cybernetic enhancements as well as mechanized artificial intelligence."
            tooltipImage = 'images/tooltips/project.png';
            break;
        case 'ult execute':
            tooltipTitle = 'ULTIMATE EXECUTE';
            tooltipContent = 'Champions with an execute ultimate are any champion whose ultimate either attempts an execution, can execute or has an ultimate which scales with percentage missing health. This also includes any champions whose ultimate generates an execution bar.';
            tooltipImage = 'images/tooltips/exec.png';
            break;
        case 'true damage':
            tooltipTitle = 'TRUE DAMAGE';
            tooltipContent = "True damage is one of the three types of damage in League of Legends. Unless otherwise stated, true damage ignores incoming damage reduction as well as incoming damage amplification. In other words, true damage is powerful against champions that build resistances as this damage type effectively negates them.";
            tooltipImage = 'images/tooltips/execute.png';
            break;
        case 'pool party':
            tooltipTitle = 'POOL PARTY';
            tooltipContent = "Quote from a pool party champion: \n 'Somebody pees in the pool. That's a time secret. You can have that one.'";
            tooltipImage = 'images/tooltips/pool party.png';
            break;
        case 'prestige':
            tooltipTitle = 'PRESTIGE SKINS';
            tooltipContent = "Prestige skins are one of the rarest tiers of skins in League of Legends. Prestige skins come in two different types: Battle Pass Prestige Skins and Mythic Shop Prestige Skins. ";
            break;
        case 'arcade':
            tooltipTitle = 'ARCADE';
            tooltipContent = "Arcade is a series of alternate future/universe skins in League of Legends, featuring champions digitized into an arcade setting. Arcade officially encompasses three skin lines: Arcade Heroes, Arcade Battle Bosses, and Demacia Vice."; 
            tooltipImage = 'images/tooltips/arcade.png';
            break;
        case 'dark star':
            tooltipTitle = 'DARK STAR SKINLINE';
            tooltipContent = 'Entropy engulfs galaxies in the yawning maw of the Dark Star, whose corruptants, titanic creatures of black-hole oblivion, snuff out the light of existence in every system they touch and plunge them into nothingness.'.italics();
            tooltipImage = 'images/tooltips/dark star.png';
            break;
        case 'cosmic':
            tooltipTitle = 'COSMIC SKINLINE';
            tooltipContent = "Vast stardust creatures control the ebb and flow of creation, painting the cosmos with sublime light as their celestial court drifts along the fabric of time and space.".italics();
            tooltipImage = 'images/tooltips/cosmic.png';
            break;
        case 'elderwood':
            tooltipTitle = 'ELDERWOOD SKINLINE';
            tooltipContent = 'Entropy engulfs galaxies in the yawning maw of the Dark Star, whose corruptants, titanic creatures of black-hole oblivion, snuff out the light of existence in every system they touch and plunge them into nothingness.'.italics();
            tooltipImage = 'images/tooltips/elderwood.png';
            break
        case 'space groove':
            tooltipTitle = 'SPACE GROOVE SKINLINE';
            tooltipContent = "Space Groove is a series of alternate future/universe skins in League of Legends. Set in a galaxy powered by a mysterious energy known as"+ "The Groove,".italics() +"champions fight back against a powerful witch and her army of Harsh Vibes to keep things groovy.";
            tooltipImage = 'images/tooltips/space groove.png';
            break
        case 'hextech':
            tooltipTitle = 'HEXTECH SKINLINE';
            tooltipContent = "Hextech is a series of alternate future/universe skins in League of Legends. Set in an alternate Piltover and Zaun, each of the champions are either Hextech users or Hextech machinery. The very same technology also powers loot chests in League of Legends! ";
            tooltipImage = 'images/tooltips/hextech.png';
            break
        case 'fright night':
            tooltipTitle = 'FRIGHT NIGHT';
            tooltipContent = "The Fright Night skinline was heavily inspired by the works of Tim Burton such as the The Nightmare Before Christmas and Edward Scissorhands. ";
            break
        case 'empyrean':
            tooltipTitle = 'EMPYREAN SKINLINE';
            tooltipContent = "Neon Strata is a series of alternate future/universe skins in League of Legends. Set in a world where the Foreglow transforms champions into an otherworldly force called "+ "Empyrean.".bold();
            break
        case "og40":
            tooltipTitle = 'OG 40 CHAMPS';
            tooltipContent = " When League of Legends was originally released, there were only "+ "40 champions".bold() +" you could choose from. Interestingly, out of these 40, 16 have received complete reworks or major overhauls.";
            tooltipImage = 'images/tooltips/og40.png';
            break;
        case "season 7+":
            tooltipTitle = 'SEASON 7+';
            tooltipContent = "Champions that were relased in season 7 or above. This includes around one thrird of League of Legends current champion roster!";
            break;
        case "season 2-6":
            tooltipTitle = 'SEASON 2-6';
            tooltipContent = "Champions that were relased between the start of season 2 and the end of season 6. This includes around one thrird of League of Legends current champion roster!";
            break;
        default:
            tooltipTitle = rows[index];
            tooltipContent = `Champion class in League of Legends`;
            tooltipImage = `images/tooltips/default_tooltip.png`;
        }
        
        header.setAttribute('data-tooltip-title', tooltipTitle);
        header.setAttribute('data-tooltip-content', tooltipContent);
        header.setAttribute('data-tooltip-image', tooltipImage);
      }
    });
  
    // Update the rank (difficulty) header with an image and tooltip
    rankHeaders.forEach((header) => {
      if (rank) {
        // Update the image as before
        const img = document.createElement('img');
        img.src = `images/ranks/${rank.toLowerCase()}.webp`;
        img.alt = rank;
        img.classList.add('rank-image');
        
        header.innerHTML = '';
        header.appendChild(img);
        
        // Set tooltip title, content, and image based on the rank
        let tooltipTitle = '';
        let tooltipContent = '';
        let tooltipImage = '';
        
        switch(rank.toLowerCase()) {
          case 'iron':
            tooltipTitle = 'Iron Difficulty';
            tooltipContent = 'Very easy puzzle difficulty. Each square has many possible solutions.';
            break;
          case 'bronze':
            tooltipTitle = 'Bronze Difficulty';
            tooltipContent = 'Easy puzzle difficulty. Most squares have many possible solutions.';
            break;
          case 'silver':
            tooltipTitle = 'Silver Difficulty';
            tooltipContent = 'Moderate difficulty with some challenging combinations.';
            break;
          case 'gold':
            tooltipTitle = 'Gold Difficulty';
            tooltipContent = 'Challenging puzzle requiring some good game knowledge.';
            break;
          case 'platinum':
            tooltipTitle = 'Platinum Difficulty';
            tooltipContent = 'Difficult puzzle with some challenging squares.';
            break;
          case 'diamond':
            tooltipTitle = 'Diamond Difficulty';
            tooltipContent = 'Very difficult puzzle for players with extensive League knowledge.';
            break;
          case 'challenger':
            tooltipTitle = 'Challenger Difficulty';
            tooltipContent = 'Most squares have only a few correct awnser! The most difficult puzzle category. ';
            break;
        }
        
        header.setAttribute('data-tooltip-title', tooltipTitle);
        header.setAttribute('data-tooltip-content', tooltipContent);
        header.setAttribute('data-tooltip-image', tooltipImage);
      }
    });
    
    // Initialize tooltips after updating headers
    initializeTooltips();
}



// Make sure to initialize tooltips when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // This will apply tooltips to any static headers
    // Dynamic headers will get tooltips when updateHeaders is called
    initializeTooltips();
  });