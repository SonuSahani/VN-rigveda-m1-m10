// Debate recording function
window.debateHymn = (hymnId, choice, line) => {
  try {
    let entries = JSON.parse(localStorage.getItem('rta_debate_log') || '[]');
    entries.push({ hymnId, choice, line, time: Date.now() });
    localStorage.setItem('rta_debate_log', JSON.stringify(entries));
  } catch (e) {
    console.error('Debate log failed:', e);
  }
};

function startHymn(hymnId){
    if (window.state){
        window.state.currentHymn = hymnId;
        if (hymnId === '1.1') window.state.currentMantra = 'Agniṁ īḷe purohitaṁ';
        if (window.updateHymnInfo) window.updateHymnInfo();
    }
    if (window.debateHymn) window.debateHymn(hymnId, '', '');
}

window.startMandala1Hymn = startHymn;
window.startHymn11 = function(){ startHymn('1.1'); };

/* ---------- COMPLETE MANDALA I SCENES - All 191 Hymns ---------- */
const scenes = {
    // Original scenes
    intro_cinematic: [
      { who:'', text:'…', bg: 'bgSilence', action: () => { switchBG(bgSilence); showSprite(player); unlockAchievement('firstSteps'); } },
      { who:'Narrator', text:'In the beginning, there was no earth, no sky.\nOnly silence — breathing light within itself.', action: () => { switchBG(bgWhisper); showCinematicLine(0); } },
      { who:'Narrator', text:'From that silence came a whisper.\nFrom whisper — flame.\nAnd from flame — the hymn.', action: () => showCinematicLine(1) },
      { who:'Narrator', text:'You awaken where verses are born — the Ether of Ṛta.\nYour memory is smoke. Your name, unknown.', action: () => { switchBG(bgAwaken); showCinematicLine(2); } },
      { who:'???', text:'A voice sings through the light — delicate, ancient.', action: () => { switchBG(bgAwaken); showCinematicLine(3); showSprite(apsara); setSpriteEmotion(apsara, 'thoughtful'); } },
      { who:'Apsara', text:'"Seeker of Flame... your heart still remembers."', action: () => setSpriteEmotion(apsara, 'happy') },
      { who:'Gandharva', text:'"And your mind still listens. You are between knowing and being."', action: () => { showSprite(gandharva); setSpriteEmotion(gandharva, 'serious'); } },
      { who:'Apsara', text:'"Before we guide you through the Mandalas, tell us…"', action: () => { setSpriteEmotion(apsara, 'thoughtful'); showIntroChoice(); } }
    ],
    mandala1_opening: [
      { who:'Narrator', text:'The light around you becomes flame — dancing, alive.\nYou step into the first Mandala — the Realm of Agni.', action: () => { switchBG(bgAgni); hideSprite(player); showSprite(apsara); showSprite(gandharva); } },
      { who:'Apsara', text:'"Agni — the divine fire, priest of the sacrifice, messenger between realms."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"The hymn begins not with worship, but awakening."', action: () => setSpriteEmotion(gandharva, 'thoughtful') },
      { who:'Apsara', text:'"The first verse calls: `Agniṁ īḷe purohitaṁ yajñasya devaṁ ṛtvijam.`"', action: () => { setSpriteEmotion(apsara, 'happy'); state.currentMantra = "Agniṁ īḷe purohitaṁ"; updateHymnInfo(); } },
      { who:'Gandharva', text:'"Praise the Fire — the Priest — the Divine who kindles creation."\n"Feel it. Do you perceive the heat or the harmony?"', action: () => { setSpriteEmotion(gandharva, 'thoughtful'); showMandala1Approach(); } }
    ],
    mandala1_scene_ritual: [
      { who:'Narrator', text:'You stand before the sacred fire. The flames dance, awaiting your offering.', action: () => { switchBG(bgIgnite); setSpriteEmotion(apsara, 'thoughtful'); } },
      { who:'Apsara', text:'"The ritual is not just action, but intention made manifest."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"What you offer here shapes the connection between worlds."', action: () => setSpriteEmotion(gandharva, 'thoughtful') },
      { who:'Apsara', text:'"Choose your offering wisely."', action: () => { setSpriteEmotion(apsara, 'happy'); showRitualChoice(); } }
    ],
    mandala1_scene_soma: [
      { who:'Narrator', text:'The Soma flows — golden nectar of the gods, essence of inspiration.', action: () => { switchBG(bgSomaDreamRealm); setSpriteEmotion(gandharva, 'thoughtful'); } },
      { who:'Gandharva', text:'"Soma is both plant and deity, both substance and spirit."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"It opens the doors of perception, allowing communion with the divine."', action: () => setSpriteEmotion(apsara, 'thoughtful') },
      { who:'Gandharva', text:'"Through Soma, Indra gains his strength. Through Soma, poets find their voice."', action: () => setSpriteEmotion(gandharva, 'happy') },
      { who:'Apsara', text:'"Let us continue deeper into the hymns."', action: () => { setSpriteEmotion(apsara, 'serious'); startMantraPuzzle(); } }
    ],
    
    // Family of Madhuchchhandas (Hymns 1.1–1.19: Agni-Focused Invocations)
    mandala1_hymn1_1: [
      { who:'Apsara', text:'"We begin with the first hymn, the spark that ignites all others. Agni, the divine priest."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'serious'); state.currentHymn = '1.1'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"`Agnim īḷe purohitam...` I praise Agni, the chosen priest, the minister of sacrifice."', action: () => setSpriteEmotion(gandharva, 'thoughtful') },
      { who:'Apsara', text:'"He is the herald between worlds, the carrier of offerings. Do you feel his warmth?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.1'); } }
    ],
    mandala1_hymn1_2: [
      { who:'Apsara', text:'"Now the wind stirs — Vayu, bearer of breath and prayer. Listen to how the hymn calls him to the Soma."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.2'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"`Vāyoṃ śūcīnā śucayo na ā gahi...` Come, Vayu, as to a chariot, to our praise. The air carries the offering upward."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"In this verse, purity meets speed. What stirs in you — the rush of wind or the calm it brings?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.2'); } }
    ],
    mandala1_hymn1_3: [
      { who:'Gandharva', text:'"The twins arrive — Ashvins, healers on golden chariots. Their hymn seeks swift aid in the ritual."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.3'; updateHymnInfo(); } },
      { who:'Apsara', text:'"`Aśvinā vājinīvasū...` Ye Ashvins, rich in horses, come to us today. They mend what is broken, body and spirit."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Healing as duality — one wound, two hands. How do you call upon them?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showAsvinsChoice('1.3'); } }
    ],
    mandala1_hymn1_4: [
      { who:'Apsara', text:'"Here the sages weave names into one thread — Indra, Mitra, Varuna, all echoes of the singular divine."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.4'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"`Indram mitraṃ varuṇam agnim āhur...` They call him Indra, Mitra, Varuna, Agni. The One becomes many in the poets\' words."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Unity in diversity — Ṛta\'s first whisper. Does your heart or mind grasp this truth first?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.4'); } }
    ],
    mandala1_hymn1_5: [
      { who:'Apsara', text:'"Agni appears again, but now as illuminator — the light that reveals what is hidden."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.5'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"Jātavedas, knower of all beings, born in wood. He carries our vision to the gods."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Light reveals but also consumes. Do you seek illumination or preservation?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.5'); } }
    ],
    mandala1_hymn1_6: [
      { who:'Gandharva', text:'"Agni as kindler — the one who sparks the flame from darkness into being."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.6'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He is born anew each morning, carried by the ten maidens — the fingers of the priest."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Creation through friction — light from darkness. What does this teach you?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.6'); } }
    ],
    mandala1_hymn1_7: [
      { who:'Apsara', text:'"Agni the wealth-giver — not of gold, but of nourishment and spiritual abundance."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.7'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He grants prosperity, heroic strength, and wisdom — the three treasures of existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"True wealth is not possession but circulation. What do you wish to receive and give?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.7'); } }
    ],
    mandala1_hymn1_8: [
      { who:'Gandharva', text:'"Agni as guardian — protector of humanity from darkness and disorder."', action: () => { switchBG(bgAgni); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.8'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He stands between us and the night, between order and chaos. A vigilant flame."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Protection requires vigilance. What do you guard in your inner world?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.8'); } }
    ],
    mandala1_hymn1_9: [
      { who:'Apsara', text:'"Agni the purifier — who cleanses not with water but with transforming fire."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.9'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He burns away impurities, leaving only the essence — the truth that remains after illusion turns to ash."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Purification can be painful. What would you willingly let burn away?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.9'); } }
    ],
    mandala1_hymn1_10: [
      { who:'Gandharva', text:'"Agni as mediator — the messenger who carries prayers between earth and heaven."', action: () => { switchBG(bgAgni); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.10'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He translates human longing into divine language, divine will into human understanding."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"All true communication is translation. What message do you wish to send?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.10'); } }
    ],
    mandala1_hymn1_11: [
      { who:'Apsara', text:'"Agni the conqueror — who overcomes enemies not with weapons but with light."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.11'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He defeats the darkness, the devourers, the obstructors of sacrifice. Victory through illumination."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"The greatest enemy is within. What darkness do you wish to overcome?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.11'); } }
    ],
    mandala1_hymn1_12: [
      { who:'Gandharva', text:'"Agni as lord of the house — the domestic fire that nourishes family and community."', action: () => { switchBG(bgAgni); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.12'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He dwells in every home, the center of daily life, the witness to both ordinary and sacred moments."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"The sacred is found in the ordinary. What rituals mark your days?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.12'); } }
    ],
    mandala1_hymn1_13: [
      { who:'Apsara', text:'"Agni in sacrifices — the essence of ritual, the fire that transforms offerings into divine essence."', action: () => { switchBG(bgIgnite); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.13'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"Without Agni, sacrifice is incomplete. He is the mouth that consumes, the messenger that delivers."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"True sacrifice transforms the giver. What are you willing to offer?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.13'); } }
    ],
    mandala1_hymn1_14: [
      { who:'Gandharva', text:'"Now we turn to the Viśvedevas — all the gods together, the collective divine presence."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.14'; updateHymnInfo(); } },
      { who:'Apsara', text:'"They come as a company, each with unique gifts, united in purpose. The harmony of many voices."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Unity in multiplicity. How do you honor the many aspects of the divine?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.14'); } }
    ],
    mandala1_hymn1_15: [
      { who:'Apsara', text:'"To Ṛta itself — cosmic order, the fundamental principle that upholds the universe."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.15'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"Not a god, but the law that gods follow. The rhythm of sun and moon, the pattern of seasons."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Order is not rigidity but dynamic balance. Where do you find Ṛta in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.15'); } }
    ],
    mandala1_hymn1_16: [
      { who:'Gandharva', text:'"Indra appears — drinker of Soma, wielder of thunderbolt, slayer of Vṛtra."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.16'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He releases the waters, frees the cows, conquers the forces that withhold life\'s abundance."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Power requires responsibility. What would you liberate with your strength?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showIndraChoice('1.16'); } }
    ],
    mandala1_hymn1_17: [
      { who:'Apsara', text:'"Indra and Agni together — the warrior and the priest, power and wisdom in union."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.17'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"They complement each other: Indra conquers, Agni transforms. Action and reflection."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Balance of opposites creates wholeness. What dualities do you reconcile?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.17'); } }
    ],
    mandala1_hymn1_18: [
      { who:'Gandharva', text:'"Indra the breaker of forts — who shatters obstacles that confine and limit life."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.18'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He demolishes the prisons we build around ourselves — fear, ignorance, attachment."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Liberation requires destruction. What walls do you wish to break down?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showIndraChoice('1.18'); } }
    ],
    mandala1_hymn1_19: [
      { who:'Apsara', text:'"Agni and the Maruts — fire and storm, the elemental forces that shape existence."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.19'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"The Maruts are Indra\'s companions, the storm gods who ride the winds, fierce yet life-giving."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Destruction and creation are two faces of the same process. What storms have shaped you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.19'); } }
    ],
    
    // Family of Medhātithi Kāṇva (Hymns 1.20–1.30: Joint Praises)
    mandala1_hymn1_20: [
      { who:'Gandharva', text:'"The Aśvins return — twin healers who traverse the world in their golden chariot."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.20'; updateHymnInfo(); } },
      { who:'Apsara', text:'"They restore sight to the blind, youth to the aged, wholeness to the broken. Divine physicians."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Healing comes in many forms. What in you needs restoration?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showAsvinsChoice('1.20'); } }
    ],
    mandala1_hymn1_21: [
      { who:'Apsara', text:'"Indra and Agni again — the eternal pair, action and transformation in harmony."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.21'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"Together they perform great deeds — Indra provides the power, Agni the means of expression."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Partnership amplifies potential. Who are your divine companions?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.21'); } }
    ],
    mandala1_hymn1_22: [
      { who:'Gandharva', text:'"Viṣṇu appears — the wide-strider who measured the worlds in three steps."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.22'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He establishes order, pervades all existence, the guardian of cosmic law."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"True power establishes and maintains. What foundations do you build?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showVisnuChoice('1.22'); } }
    ],
    mandala1_hymn1_23: [
      { who:'Apsara', text:'"To the Waters — Apas, the life-givers, purifiers, bearers of healing essence."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.23'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"They flow from heaven to earth, carrying blessings, removing impurities, sustaining all life."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Water adapts to any container yet wears away stone. What is your nature?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.23'); } }
    ],
    mandala1_hymn1_24: [
      { who:'Gandharva', text:'"Varuṇa the remover of sin — the cosmic judge who upholds moral order."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.24'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He binds the guilty with his noose, releases the penitent. Justice tempered with mercy."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"True accountability is liberating. What binds you that needs release?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showVarunaChoice('1.24'); } }
    ],
    mandala1_hymn1_25: [
      { who:'Apsara', text:'"Varuṇa again, but now as upholder of Ṛta — the cosmic order that sustains existence."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.25'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He observes all actions through the stars, maintains the paths of the winds, the flow of rivers."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Order is not constraint but the condition for freedom. How do you align with Ṛta?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.25'); } }
    ],
    mandala1_hymn1_26: [
      { who:'Gandharva', text:'"Agni as Hotar — the priest who invokes the gods, the first voice of the sacrifice."', action: () => { switchBG(bgIgnite); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.26'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He calls the deities by name, invites them to the offering, makes the sacrifice effective."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Invocation is recognition. What do you call forth in your life?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.26'); } }
    ],
    mandala1_hymn1_27: [
      { who:'Apsara', text:'"Agni adorned as a horse — symbol of power, speed, and sacrificial essence."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.27'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He carries the gods to the sacrifice, bears the offerings to them, swift as a steed."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"True service carries both ways. What do you transport between worlds?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.27'); } }
    ],
    mandala1_hymn1_28: [
      { who:'Gandharva', text:'"Indra the crusher of foes — who defeats enemies that obstruct cosmic flow."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.28'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He shatters those who withhold the waters, who hoard abundance, who disrupt sacrifice."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Obstruction takes many forms. What internal foes do you battle?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showIndraChoice('1.28'); } }
    ],
    mandala1_hymn1_29: [
      { who:'Apsara', text:'"Indra the giver of wealth — not material riches, but spiritual abundance and vital force."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.29'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He bestows horses, gold, sons, and victory — symbols of life\'s fullness and creative power."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"True wealth is circulation, not accumulation. What do you generously share?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.29'); } }
    ],
    mandala1_hymn1_30: [
      { who:'Gandharva', text:'"Indra and the Aśvins together — power and healing, conquest and restoration."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.30'; updateHymnInfo(); } },
      { who:'Apsara', text:'"They complement each other: Indra creates conditions for abundance, Aśvins mend what is broken."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"After victory comes healing. What in your life needs restoration?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.30'); } }
    ],
    
    // Family of Gotama Rāhūgaṇa (Hymns 1.31–1.35, 1.50–1.93: Indra and Diverse Deities)
    mandala1_hymn1_31: [
      { who:'Apsara', text:'"Agni the firstborn — primordial fire, emerging from the waters, the original light."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.31'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He was born before time, established the cosmos, the foundation of all subsequent creation."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Origin contains the pattern of all that follows. What is your source?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.31'); } }
    ],
    mandala1_hymn1_32: [
      { who:'Gandharva', text:'"Indra the slayer of Vṛtra — his greatest deed, releasing the waters that were imprisoned."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.32'; updateHymnInfo(); } },
      { who:'Apsara', text:'"Vṛtra represents obstruction, stagnation, the withholding of life\'s flow. Indra shatters this prison."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Liberation requires courage. What inner dragon do you face?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showIndraChoice('1.32'); } }
    ],
    mandala1_hymn1_33: [
      { who:'Apsara', text:'"Indra victorious — the triumphant hero who overcomes all obstacles and adversaries."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.33'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He never accepts defeat, finds new strength in challenge, turns setbacks into victories."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"True victory is not domination but liberation. What battles have you won?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.33'); } }
    ],
    mandala1_hymn1_34: [
      { who:'Gandharva', text:'"The Aśvins as swift rescuers — who arrive in moments of crisis, bringing salvation."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.34'; updateHymnInfo(); } },
      { who:'Apsara', text:'"They save the drowning, restore the trapped, heal the afflicted — divine emergency responders."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Help comes when least expected. What rescues have you experienced?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showAsvinsChoice('1.34'); } }
    ],
    mandala1_hymn1_35: [
      { who:'Apsara', text:'"Savitṛ the impeller — who stimulates all beings to action, the awakener of potential."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.35'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"He urges the sun to rise, inspires the poet to sing, motivates the sacrificer to offer."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Inspiration is divine impulsion. What moves you to create?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.35'); } }
    ],
    
   
    mandala1_hymn1_36: [
      { who:'Gandharva', text:'"Agni as friend of humanity — the divine companion who walks with mortals."', action: () => { switchBG(bgAgni); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.36'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He dwells in every home, shares in human joys and sorrows, the most approachable of gods."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Friendship bridges worlds. Who are your divine companions?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.36'); } }
    ],
    mandala1_hymn1_37: [
      { who:'Apsara', text:'"The Maruts appear — storm gods, sons of Rudra, fierce yet benevolent forces of nature."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.37'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"They ride the winds, wield lightning, bring rain — destructive yet life-giving, chaotic yet ordered."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Nature\'s power is both beautiful and terrible. How do you relate to wild forces?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.37'); } }
    ],
    mandala1_hymn1_38: [
      { who:'Gandharva', text:'"The Maruts as rain-bringers — who end drought, nourish the earth, ensure abundance."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.38'; updateHymnInfo(); } },
      { who:'Apsara', text:'"Their storms renew the land, their lightning fertilizes, their thunder announces transformation."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Renewal requires disruption. What storms bring growth to your life?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showMarutsChoice('1.38'); } }
    ],
    mandala1_hymn1_39: [
      { who:'Apsara', text:'"The Maruts as sons of Rudra — fierce deities connected to Shiva, destroyers and creators."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.39'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"They inherit their father\'s dual nature — both terrifying and compassionate, wild yet disciplined."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"Duality is the nature of existence. How do you hold opposites?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.39'); } }
    ],
    mandala1_hymn1_40: [
      { who:'Gandharva', text:'"Brahmanaspati — lord of prayer, master of sacred speech, who opens the doors of the divine."', action: () => { switchBG(bgLibraryOfHymns); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.40'; updateHymnInfo(); } },
      { who:'Apsara', text:'"He removes obstacles, clears the path, makes the sacrifice effective through the power of word."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"Words create worlds. What mantras do you live by?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.40'); } }
    ],
    
    
    mandala1_hymn1_41: [
      { who:'Apsara', text:'"Varuṇa, Mitra, and Aryaman — the guardians of cosmic order and social harmony."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.41'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"`Varuṇaṃ mitrāryamā...` Varuṇa, Mitra, Aryaman — we call upon you."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"How do you maintain balance between cosmic order and personal freedom?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.41'); } }
    ],
	  mandala1_hymn1_42: [
		{ who:'Apsara', text:'"Varuṇa as guide of paths — who shows the way through life\'s journey."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.42'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Varuṇaṃ pāthām...` Varuṇa who knows the paths, guide us."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What paths do you seek guidance on in your life\'s journey?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.42'); } }
	  ],
	  mandala1_hymn1_43: [
		{ who:'Apsara', text:'"Rudra the benevolent healer — fierce power transformed into compassion."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.43'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Rudrāya stavate...` To Rudra we offer praise, the benevolent one."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you transform your fierce power into compassionate action?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.43'); } }
	  ],
	  mandala1_hymn1_44: [
		{ who:'Apsara', text:'"Agni as dawn-kindler — who lights the morning fire, herald of the new day."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.44'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Agniṁ uṣasam...` Agni who kindles with the dawn, we invoke."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What new beginnings do you welcome in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.44'); } }
	  ],
	  mandala1_hymn1_45: [
		{ who:'Apsara', text:'"Agni as sacrificial fire — the essence of ritual transformation."', action: () => { switchBG(bgIgnite); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.45'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Agniṁ havīṣmat...` Agni rich in oblations, accept our offering."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What transformations are you willing to undergo?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.45'); } }
	  ],
	  mandala1_hymn1_46: [
		{ who:'Apsara', text:'"The Aśvins as dawn-charioteers — who race across the sky in their golden vehicle."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.46'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Aśvinau rathe...` O Aśvins in your chariot, come to us."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What assistance do you seek on your journey?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.46'); } }
	  ],
	  mandala1_hymn1_47: [
		{ who:'Apsara', text:'"The Aśvins as helpers — who assist those in need, respond to calls for aid."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.47'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Aśvinau sahasra...` O Aśvins with thousand aids, help us."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you help others in their time of need?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.47'); } }
	  ],
	  mandala1_hymn1_48: [
		{ who:'Apsara', text:'"Uṣas the dawn — golden-tressed goddess, daughter of heaven, herald of the sun."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.48'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Uṣāṃ jyotir...` Uṣā, daughter of light, awaken us."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What new dawns are you experiencing in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.48'); } }
	  ],
	  mandala1_hymn1_49: [
		{ who:'Apsara', text:'"Uṣas the awakener — who stirs all creatures from sleep, rouses the world to activity."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.49'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Uṣāṃ budhyā...` Uṣā who awakens the world, come."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What parts of you are awakening to new possibilities?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.49'); } }
	  ],
	  mandala1_hymn1_50: [
		{ who:'Apsara', text:'"Sūrya the sun — all-seeing eye of the gods, source of light, life, and consciousness."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.50'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"`Sūryam āpa...` Sūrya, the sun, behold our offering."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you receive the light of wisdom in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showSuryaChoice('1.50'); } }
	  ],
	  
	  // Continue with hymns 1.51 to 1.100
	  mandala1_hymn1_51: [
		{ who:'Apsara', text:'"Indra the fort-destroyer — who shatters obstacles that confine life."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.51'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He demolishes prisons of fear and ignorance with his thunderbolt."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What inner fortifications do you need to break down?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.51'); } }
	  ],
	  mandala1_hymn1_52: [
		{ who:'Apsara', text:'"Indra the battle-winner — who triumphs over all adversaries."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.52'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He never accepts defeat, finding strength in every challenge."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you transform setbacks into victories?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.52'); } }
	  ],
	  mandala1_hymn1_53: [
		   { who:'Apsara', text:'"Indra with mighty arm — whose strength upholds cosmic order."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.53'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His power is both destructive and creative, maintaining balance."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you use your strength for creation?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.53'); } }
	  ],
	  mandala1_hymn1_54: [
		{ who:'Apsara', text:'"Indra the unconquered — who cannot be defeated by any foe."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.54'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His defenses are perfect, his strength invincible."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What inner strength do you call upon in adversity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.54'); } }
	  ],
	  mandala1_hymn1_55: [
		{ who:'Apsara', text:'"Indra vast and strong — whose power permeates all realms."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.55'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He is omnipresent in his might, yet responsive to prayer."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you express your power in the world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.55'); } }
	  ],
	  mandala1_hymn1_56: [
		{ who:'Apsara', text:'"Indra the heaven-holder — who supports the celestial realms."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.56'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He upholds the cosmic structure, maintaining order above."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What structures do you uphold in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.56'); } }
	  ],
	  mandala1_hymn1_57: [
		{ who:'Apsara', text:'"Indra the Soma-drinker — who is invigorated by the sacred offering."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.57'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He finds inspiration and strength through ritual communion."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What practices renew your spirit?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.57'); } }
	  ],
	  mandala1_hymn1_58: [
		{ who:'Apsara', text:'"Agni the Hotar of gods — who invokes the divine assembly."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.58'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He calls the deities by name, making the sacrifice effective."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you call forth the sacred in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.58'); } }
	  ],
	  mandala1_hymn1_59: [
		{ who:'Apsara', text:'"Agni the ancient flame — who has existed since the dawn of time."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.59'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He carries the wisdom of ages, eternal yet ever-renewed."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What ancient wisdom guides your path?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.59'); } }
	  ],
	  mandala1_hymn1_60: [
		{ who:'Apsara', text:'"Agni born in wood — who emerges from the friction of existence."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.60'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He is created through interaction, born from the meeting of opposites."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What creative tensions give birth to new insights?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.60'); } }
	  ],
	  mandala1_hymn1_61: [
		{ who:'Apsara', text:'"Indra the inventor of hymns — who inspires sacred poetry."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.61'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He stirs the poets to sing, giving voice to divine truths."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What words do you long to express?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.61'); } }
	  ],
	  mandala1_hymn1_62: [
		{ who:'Apsara', text:'"Indra the recoverer of cows — who liberates what was stolen."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.62'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He restores abundance that was hidden or taken away."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What have you lost that you wish to reclaim?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.62'); } }
	  ],
	  mandala1_hymn1_63: [
		{ who:'Apsara', text:'"Indra the long-armed — whose reach extends across all realms."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.63'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He grasps what is distant, bringing it near to those who call."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you reach for in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.63'); } }
	  ],
	  mandala1_hymn1_64: [
		{ who:'Apsara', text:'"The Maruts golden-armored — who shine like the sun in their splendor."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.64'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They wear brilliant armor as they ride the storm winds."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you protect your inner radiance?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.64'); } }
	  ],
	  mandala1_hymn1_65: [
		{ who:'Apsara', text:'"Agni the life-giver — who nourishes all beings with his warmth."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.65'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He sustains existence, providing energy for growth and transformation."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What nourishes your spirit?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.65'); } }
	  ],
	  mandala1_hymn1_66: [
		{ who:'Apsara', text:'"Agni bright-shining — whose light dispels all darkness."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.66'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He illuminates the path, revealing what was hidden."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What truths are you ready to see?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.66'); } }
	  ],
	  mandala1_hymn1_67: [
		{ who:'Apsara', text:'"Agni the tongue of gods — who speaks the divine language."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.67'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He conveys the will of the deities to humanity."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you listen to divine messages?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.67'); } }
	  ],
	  mandala1_hymn1_68: [
		{ who:'Apsara', text:'"Agni the purest flame — who consumes all impurities."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.68'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He burns away what is false, leaving only the essence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What illusions do you wish to release?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.68'); } }
	  ],
	  mandala1_hymn1_69: [
		{ who:'Apsara', text:'"Agni the first light — who illuminated the primordial darkness."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.69'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He brought consciousness into being, awakening the cosmos."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What awakening are you experiencing?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.69'); } }
	  ],
	  mandala1_hymn1_70: [
		{ who:'Apsara', text:'"Agni the household lord — who presides over the domestic hearth."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.70'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He dwells in every home, witness to daily life and sacred ritual."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you honor the sacred in everyday life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.70'); } }
	  ],
	  mandala1_hymn1_71: [
		{ who:'Apsara', text:'"Agni the knower of beings — who perceives all that exists."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.71'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He understands the nature of all creatures and things."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you seek to understand deeply?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.71'); } }
	  ],
	  mandala1_hymn1_72: [
		{ who:'Apsara', text:'"Agni the poet\'s friend — who inspires sacred verse."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.72'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He stirs the imagination, giving voice to divine mysteries."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What poetry flows through you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.72'); } }
	  ],
	  mandala1_hymn1_73: [
		{ who:'Apsara', text:'"Agni the wise one — who possesses deep understanding."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.73'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He knows the secrets of creation and the patterns of existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What wisdom do you seek?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.73'); } }
	  ],
	  mandala1_hymn1_74: [
		{ who:'Apsara', text:'"Agni the guest of men — who visits human dwellings."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.74'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He comes when invited, bringing blessings to those who welcome him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Who do you welcome into your sacred space?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.74'); } }
	  ],
	  mandala1_hymn1_75: [
		{ who:'Apsara', text:'"Agni the carrier of offerings — who transports gifts to the gods."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.75'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He conveys human devotion to the divine realm."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you offer to the sacred?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.75'); } }
	  ],
	  mandala1_hymn1_76: [
		{ who:'Apsara', text:'"Agni kindled daily — who is renewed each morning."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.76'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He is born anew each day, symbolizing eternal renewal."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you renew each day?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.76'); } }
	  ],
	  mandala1_hymn1_77: [
		{ who:'Apsara', text:'"Agni the grace-bestower — who grants divine favor."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.77'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He showers blessings upon those who honor him properly."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What grace do you experience in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.77'); } }
	  ],
	  mandala1_hymn1_78: [
		{ who:'Apsara', text:'"Agni the son of strength — born from cosmic power."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.78'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He inherits the might of his divine parents."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What strengths have you inherited?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.78'); } }
	  ],
	  mandala1_hymn1_79: [
		{ who:'Apsara', text:'"Agni the wealth-bringer — who bestows prosperity."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.79'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He provides abundance to those who perform proper sacrifice."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What true wealth do you possess?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.79'); } }
	  ],
	  mandala1_hymn1_80: [
		{ who:'Apsara', text:'"Indra Maghavan — the bountiful giver of gifts."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.80'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His bounty flows like rivers to those who honor him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you receive abundance?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.80'); } }
	  ],
	  mandala1_hymn1_81: [
		{ who:'Apsara', text:'"Indra the wise leader — who guides with intelligence."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.81'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He rules not just with force but with discernment."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you lead with wisdom?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.81'); } }
	  ],
	  mandala1_hymn1_82: [
		{ who:'Apsara', text:'"Indra the generous — who gives without measure."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.82'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His generosity is legendary, flowing like mighty rivers."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you express generosity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.82'); } }
	  ],
	  mandala1_hymn1_83: [
		{ who:'Apsara', text:'"Indra the prayer-hearer — who listens to human petitions."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.83'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He attends to the prayers of those who call upon him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you listen to others\' needs?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.83'); } }
	  ],
	  mandala1_hymn1_84: [
		{ who:'Apsara', text:'"Indra the Soma-presser — who extracts the essence."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.84'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He obtains the vital essence that gives strength and inspiration."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What essence do you extract from experience?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.84'); } }
	  ],
	  mandala1_hymn1_85: [
		{ who:'Apsara', text:'"The Maruts the shakers — who stir the world to life."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.85'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"Their energy moves mountains and awakens dormant forces."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What needs shaking in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.85'); } }
	  ],
	  mandala1_hymn1_86: [
		{ who:'Apsara', text:'"The Maruts the playful — who dance with wild joy."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.86'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They find delight in their stormy revels, fierce yet joyous."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you express wild joy?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.86'); } }
	  ],
	  mandala1_hymn1_87: [
		{ who:'Apsara', text:'"The Maruts the spear-wielders — who carry weapons of light."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.87'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They arm themselves with lightning as they ride the winds."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What tools do you wield for transformation?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.87'); } }
	  ],
	  mandala1_hymn1_88: [
		{ who:'Apsara', text:'"The Maruts the companions — who travel together as one."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.88'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They move as a unified company, each supporting the others."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Who are your companions on the journey?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.88'); } }
	  ],
	  mandala1_hymn1_89: [
		{ who:'Apsara', text:'"The Viśvedevas the peace-givers — who bring harmony."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.89'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They calm conflicts and establish balance among all beings."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you create peace in your world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.89'); } }
	  ],
	  mandala1_hymn1_90: [
		{ who:'Apsara', text:'"The Viśvedevas honey-sweet — whose presence is delightful."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.90'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They bring sweetness like nectar to those who honor them."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What sweetness do you savor in life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.90'); } }
	  ],
	  mandala1_hymn1_91: [
		{ who:'Apsara', text:'"Soma the cleanser — who purifies all impurities."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.91'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He washes away stains, leaving purity in his wake."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What cleansing do you seek?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.91'); } }
	  ],
	  mandala1_hymn1_92: [
		{ who:'Apsara', text:'"Uṣas heaven\'s daughter — born of celestial light."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.92'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"She emerges each morning from her divine parentage."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What divine heritage do you claim?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.92'); } }
	  ],
	  mandala1_hymn1_93: [
		{ who:'Apsara', text:'"Agni and Soma together — fire and nectar in union."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.93'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They complement each other, transformation and inspiration."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What complementary forces work in you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.93'); } }
	  ],
	  
	  // Family of Kutsa Āṅgirasa & Others (Hymns 1.94–1.191: Philosophical & Closing Praises)
	  mandala1_hymn1_94: [
		{ who:'Apsara', text:'"Agni the helper in need — who assists those in distress."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.94'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He comes when called, removing obstacles in times of crisis."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Help appears when needed. What rescues have you experienced?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.94'); } }
	  ],
	  mandala1_hymn1_95: [
		{ who:'Apsara', text:'"Agni the queller of foes — who defeats adversaries."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.95'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He overcomes enemies through his radiant power."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What inner adversaries do you face?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.95'); } }
	  ],
	  mandala1_hymn1_96: [
		{ who:'Apsara', text:'"Agni the child of waters — born from the cosmic ocean."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.96'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He emerges from the primordial waters as pure flame."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What depths have you emerged from?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.96'); } }
	  ],
	  mandala1_hymn1_97: [
		{ who:'Apsara', text:'"Agni the purifier of sins — who removes moral stains."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.97'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He cleanses transgressions through his transforming fire."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What burdens do you wish to release?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.97'); } }
	  ],
	  mandala1_hymn1_98: [
		{ who:'Apsara', text:'"Agni the ancient sage — who possesses primordial wisdom."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.98'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He remembers the origins of all things, the patterns of existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What ancient knowledge do you seek?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.98'); } }
	  ],
	  mandala1_hymn1_99: [
		{ who:'Apsara', text:'"Agni the victorious — who triumphs over all obstacles."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.99'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He overcomes darkness, ignorance, and resistance."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What victories have you achieved?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.99'); } }
	  ],
	  mandala1_hymn1_100: [
		{ who:'Apsara', text:'"Indra the helper of Ṛbhus — who supports divine artisans."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.100'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He aids those who craft and create with skill and vision."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you support creative work?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.100'); } }
	  ],
	  mandala1_hymn1_101: [
		{ who:'Apsara', text:'"Indra the creator — who brings forth new existence."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.101'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He generates life and abundance through his power."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you create in the world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.101'); } }
	  ],
	  mandala1_hymn1_102: [
		{ who:'Apsara', text:'"Indra the singer\'s friend — who inspires sacred song."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.102'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He delights in hymns of praise, responding to devotion."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What songs flow from your heart?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.102'); } }
	  ],
	  mandala1_hymn1_103: [
		{ who:'Apsara', text:'"Indra the bull-strong — whose power is like a mighty bull."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.103'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He possesses virility and strength that cannot be contained."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What strength resides in you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.103'); } }
	  ],
	  mandala1_hymn1_104: [
		{ who:'Apsara', text:'"Indra the giver of gifts — who bestows blessings freely."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.104'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He showers prosperity upon those who honor him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What gifts do you share with others?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.104'); } }
	  ],
	  mandala1_hymn1_105: [
		{ who:'Apsara', text:'"Viṣṇu the wide-strider — who measured the worlds in three steps."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.105'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He established the cosmic order with his mighty strides."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you establish order in your world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVisnuChoice('1.105'); } }
	  ],
	  mandala1_hymn1_106: [
		{ who:'Apsara', text:'"Indra and Aśvins together — power and healing united."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.106'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They combine strength with compassion, conquest with restoration."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you balance power with healing?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.106'); } }
	  ],
	  mandala1_hymn1_107: [
		{ who:'Apsara', text:'"Indra, Agni, and Viṣṇu — the great triad of gods."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.107'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They represent power, transformation, and preservation in harmony."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What divine qualities do you embody?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.107'); } }
	  ],
	  mandala1_hymn1_108: [
		{ who:'Apsara', text:'"Indra and Agni again — the eternal partnership."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.108'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They work together to maintain cosmic order and human prosperity."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Who are your essential partners?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.108'); } }
	  ],
	  mandala1_hymn1_109: [
		{ who:'Apsara', text:'"Indra and Agni the sacrificers — who perform sacred rites."', action: () => { switchBG(bgIgnite); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.109'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They conduct the offering that maintains the connection between worlds."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What rituals do you practice?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.109'); } }
	  ],
	  mandala1_hymn1_110: [
		{ who:'Apsara', text:'"The Ṛbhus the artisans — divine craftsmen of skill."', action: () => { switchBG(bgLibraryOfHymns); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.110'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They create with wisdom, fashioning wonders with their hands."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you create with your hands?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.110'); } }
	  ],
	  mandala1_hymn1_111: [
		{ who:'Apsara', text:'"The Ṛbhus the skillful — masters of their craft."', action: () => { switchBG(bgLibraryOfHymns); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.111'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They perfect their art through dedication and practice."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What skills do you cultivate?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.111'); } }
	  ],
	  mandala1_hymn1_112: [
		{ who:'Apsara', text:'"The Aśvins the rescuers — who save those in peril."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.112'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They arrive swiftly in moments of crisis, bringing salvation."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"When have you been rescued?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.112'); } }
	  ],
	  mandala1_hymn1_113: [
		{ who:'Apsara', text:'"Uṣas heaven\'s daughter — born of celestial light."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.113'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"She brings the promise of a new day with her golden radiance."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What new beginnings do you anticipate?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.113'); } }
	  ],
	  mandala1_hymn1_114: [
		{ who:'Apsara', text:'"Rudra the father of Maruts — source of storm powers."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.114'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He generates the fierce yet beneficial forces of nature."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What powerful forces do you generate?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.114'); } }
	  ],
	  mandala1_hymn1_115: [
		{ who:'Apsara', text:'"Sūrya the remover of darkness — who dispels ignorance."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.115'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He illuminates what was hidden, revealing truth."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What darkness do you dispel?"', action: () => { setSpriteEmotion(apsara, 'happy'); showSuryaChoice('1.115'); } }
	  ],
	  mandala1_hymn1_116: [
		{ who:'Apsara', text:'"The Aśvins the nasal rescuers — who restore breathing."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.116'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They heal those who cannot breathe, restoring the life force."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What restores your life force?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.116'); } }
	  ],
	  mandala1_hymn1_117: [
		{ who:'Apsara', text:'"The Aśvins the leg restorers — who mend broken limbs."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.117'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They repair what was damaged, restoring mobility."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What has been restored in you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.117'); } }
	  ],
	  mandala1_hymn1_118: [
		{ who:'Apsara', text:'"The Aśvins the youth restorers — who renew aging bodies."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.118'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They bring vitality to those who have grown old."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What renews your spirit?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.118'); } }
	  ],
	  mandala1_hymn1_119: [
		{ who:'Apsara', text:'"The Aśvins the liberators — who free from bondage."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.119'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They release those who are trapped or confined."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What liberates your soul?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.119'); } }
	  ],
	  mandala1_hymn1_120: [
		{ who:'Apsara', text:'"The Aśvins the healers — who cure all diseases."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.120'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They possess remedies for every affliction of body and mind."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What healing do you need?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.120'); } }
	  ],
	  mandala1_hymn1_121: [
		{ who:'Apsara', text:'"Indra the creator — who brings forth new existence."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.121'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He generates life and abundance through his power."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you create in the world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.121'); } }
	  ],
	  mandala1_hymn1_122: [
		{ who:'Apsara', text:'"The Viśvedevas the givers — who bestow all blessings."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.122'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They provide whatever is needed for human flourishing."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What blessings do you receive?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.122'); } }
	  ],
	  mandala1_hymn1_123: [
		{ who:'Apsara', text:'"Uṣas the wealth-bearer — who brings prosperity."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.123'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"She carries abundance in her golden garments."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What wealth does each new day bring?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.123'); } }
	  ],
	  mandala1_hymn1_124: [
		{ who:'Apsara', text:'"Uṣas the dispeller of darkness — who conquers night."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.124'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"She overcomes the shadows with her radiant light."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What darkness do you overcome?"', action: () => { setSpriteEmotion(apsara, 'happy'); showUsasChoice('1.124'); } }
	  ],
	  mandala1_hymn1_125: [
		{ who:'Apsara', text:'"Svarbhānu the eclipse demon — who obscures the light."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.125'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He represents the forces that temporarily hide the truth."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What obscures your vision?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.125'); } }
	  ],
	  mandala1_hymn1_126: [
		{ who:'Apsara', text:'"Indra the cow-giver — who liberates abundance."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.126'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He releases the cattle that symbolize wealth and nourishment."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What abundance do you liberate?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.126'); } }
	  ],
	  mandala1_hymn1_127: [
		{ who:'Apsara', text:'"Agni the all-possessing — who contains all things."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.127'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He holds within himself the essence of all existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you contain within?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.127'); } }
	  ],
	  mandala1_hymn1_128: [
		{ who:'Apsara', text:'"Agni the flame-haired — whose radiance is his crown."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.128'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He wears his own light as a glorious adornment."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What radiance do you wear?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.128'); } }
	  ],
	  mandala1_hymn1_129: [
		{ who:'Apsara', text:'"Indra the unassailable — who cannot be overcome."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.129'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His defenses are perfect, his strength invincible."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What makes you invincible?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.129'); } }
	  ],
	  mandala1_hymn1_130: [
		{ who:'Apsara', text:'"Indra the Vṛtra-slayer — conqueror of the cosmic dragon."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.130'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He defeated the serpent who held back the waters of life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What dragons have you slain?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.130'); } }
	  ],
	  mandala1_hymn1_131: [
		{ who:'Apsara', text:'"Indra the helper — who assists those in need."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.131'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He comes to the aid of those who call upon him sincerely."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you help others?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.131'); } }
	  ],
	  mandala1_hymn1_132: [
		{ who:'Apsara', text:'"Indra the fort-breaker — destroyer of obstacles."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.132'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He shatters the barriers that confine and limit life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What barriers do you break?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.132'); } }
	  ],
	  mandala1_hymn1_133: [
		{ who:'Apsara', text:'"Indra the demon-slayer — conqueror of evil forces."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.133'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He defeats those who threaten cosmic order and human well-being."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What inner demons do you face?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.133'); } }
	  ],
	  mandala1_hymn1_134: [
		{ who:'Apsara', text:'"Vāyu the wind god — bearer of breath and life."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.134'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He moves through all spaces, carrying vital energy."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What moves through you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.134'); } }
	  ],
	  mandala1_hymn1_135: [
		{ who:'Apsara', text:'"Vāyu the charioteer — who rides the winds."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.135'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He travels swiftly, carrying prayers and offerings."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Where do your journeys take you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.135'); } }
	  ],
	  mandala1_hymn1_136: [
		{ who:'Apsara', text:'"Mitra-Varuṇa — the guardians of cosmic law."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.136'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They uphold the principles that maintain universal order."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What laws do you uphold?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.136'); } }
	  ],
	  mandala1_hymn1_137: [
		{ who:'Apsara', text:'"Mitra-Varuṇa and others — the assembly of guardians."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.137'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They work together to maintain balance in all realms."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you collaborate for balance?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.137'); } }
	  ],
	  mandala1_hymn1_138: [
		{ who:'Apsara', text:'"Pūṣan the nourisher — who feeds all beings."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.138'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He provides sustenance and guidance on life\'s path."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What nourishes your soul?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.138'); } }
	  ],
	  mandala1_hymn1_139: [
		{ who:'Apsara', text:'"The Viśvedevas — all gods together in unity."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.139'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They demonstrate the harmony of diversity in divine purpose."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you honor diversity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.139'); } }
	  ],
	  mandala1_hymn1_140: [
		{ who:'Apsara', text:'"Agni the multi-form — who takes many shapes."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.140'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He adapts to different contexts while remaining essentially himself."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you express your many aspects?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.140'); } }
	  ],
	  mandala1_hymn1_141: [
		{ who:'Apsara', text:'"Agni born thrice — who emerges in three ways."', action: () => { switchBG(bgAgniBirth); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.141'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He manifests in different forms yet remains one essence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What multiple expressions do you have?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.141'); } }
	  ],
	  mandala1_hymn1_142: [
		{ who:'Apsara', text:'"Agni in morning rite — who kindles the dawn sacrifice."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.142'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He is invoked at sunrise to begin the day\'s sacred work."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you begin your sacred work?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.142'); } }
	  ],
	  mandala1_hymn1_143: [
		{ who:'Apsara', text:'"Agni kindled — who is awakened by human hands."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.143'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He responds to the human touch that brings him to life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What awakens your inner fire?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.143'); } }
	  ],
	  mandala1_hymn1_144: [
		{ who:'Apsara', text:'"Agni flame-tongued — who speaks with fire."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.144'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His words are like flames, consuming falsehood and revealing truth."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What truth do your words reveal?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.144'); } }
	  ],
	  mandala1_hymn1_145: [
		{ who:'Apsara', text:'"Agni the wise — who possesses deep understanding."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.145'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He knows the secrets of creation and the patterns of existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What wisdom do you seek?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.145'); } }
	  ],
	  mandala1_hymn1_146: [
		{ who:'Apsara', text:'"Agni threefold — who manifests in three ways."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.146'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He appears on earth, in atmosphere, and in heaven."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you manifest in different realms?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.146'); } }
	  ],
	  mandala1_hymn1_147: [
		{ who:'Apsara', text:'"Agni the truth-knower — who perceives reality."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.147'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He distinguishes what is real from what is illusory."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What truths do you know?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.147'); } }
	  ],
	  mandala1_hymn1_148: [
		{ who:'Apsara', text:'"Agni the poet — who creates with sacred words."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.148'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He composes hymns that please the gods and inspire humans."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What poetry do you create?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.148'); } }
	  ],
	  mandala1_hymn1_149: [
		{ who:'Apsara', text:'"Agni the lord of house — who presides over the home."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.149'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He dwells in the domestic hearth, center of family life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What makes a house a home?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.149'); } }
	  ],
	  mandala1_hymn1_150: [
		{ who:'Apsara', text:'"Agni the protector — who guards against harm."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.150'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He defends those who honor him from dangers seen and unseen."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you protect?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.150'); } }
	  ],
	  mandala1_hymn1_151: [
		{ who:'Apsara', text:'"Mitra-Varuṇa again — the eternal guardians."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.151'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They maintain the cosmic order through their unwavering vigilance."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you maintain order?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.151'); } }
	  ],
	  mandala1_hymn1_152: [
		{ who:'Apsara', text:'"Mitra-Varuṇa — upholders of sacred law."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.152'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They ensure that cosmic principles are respected in all realms."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What principles do you uphold?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.152'); } }
	  ],
	  mandala1_hymn1_153: [
		{ who:'Apsara', text:'"Mitra-Varuṇa — the balanced pair of cosmic forces."', action: () => { switchBG(bgUniversalBalanceRoom); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.153'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They represent the harmony of complementary divine energies."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you balance complementary forces?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVarunaChoice('1.153'); } }
	  ],
	  mandala1_hymn1_154: [
		{ who:'Apsara', text:'"Viṣṇu the all-pervader — who fills all space."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.154'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"His presence extends throughout the cosmos, sustaining all."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you pervade your world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVisnuChoice('1.154'); } }
	  ],
	  mandala1_hymn1_155: [
		{ who:'Apsara', text:'"Viṣṇu and Indra — preservation and power united."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.155'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They work together to maintain cosmic order and overcome obstacles."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you preserve and empower?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVisnuChoice('1.155'); } }
	  ],
	  mandala1_hymn1_156: [
		{ who:'Apsara', text:'"Viṣṇu the dweller — who abides in all things."', action: () => { switchBG(bgGoldenHorizonHalo); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.156'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"He resides within creation, sustaining it from within."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"Where do you find your dwelling place?"', action: () => { setSpriteEmotion(apsara, 'happy'); showVisnuChoice('1.156'); } }
	  ],
	  mandala1_hymn1_157: [
		{ who:'Apsara', text:'"The Aśvins — the twin healers return once more."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.157'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They continue their mission of restoration and renewal."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What needs healing in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.157'); } }
	  ],
	  mandala1_hymn1_158: [
		{ who:'Apsara', text:'"The Aśvins and Dīrghatamas — healers and seer."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.158'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They combine practical healing with profound vision."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"How do you combine action with insight?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.158'); } }
	  ],
	  mandala1_hymn1_159: [
		{ who:'Apsara', text:'"Heaven and Earth — the divine parents of all."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.159'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They sustain all existence between them, providing space for life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What supports your existence?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.159'); } }
	  ],
	  mandala1_hymn1_160: [
		{ who:'Apsara', text:'"Heaven and Earth again — the eternal foundation."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.160'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They remain constant while all else changes, providing stability."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What remains constant in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.160'); } }
	  ],
	  mandala1_hymn1_161: [
		{ who:'Apsara', text:'"The Ṛbhus again — the divine artisans."', action: () => { switchBG(bgLibraryOfHymns); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.161'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"They continue their work of crafting and perfecting the world."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you perfect in your work?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.161'); } }
	  ],
	  mandala1_hymn1_162: [
		{ who:'Apsara', text:'"The horse sacrifice — ancient ritual of power."', action: () => { switchBG(bgIgnite); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.162'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"This sacred rite symbolizes the release of vital energy for cosmic renewal."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What do you sacrifice for renewal?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.162'); } }
	  ],
	  mandala1_hymn1_163: [
		{ who:'Apsara', text:'"The horse — symbol of power and freedom."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.163'; updateHymnInfo(); } },
		{ who:'Gandharva', text:'"This noble creature represents the vital force that moves between worlds."', action: () => setSpriteEmotion(gandharva, 'serious') },
		{ who:'Apsara', text:'"What drives your freedom?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.163'); } }
	  ],
	  mandala1_hymn1_164: [
		  { who:'Gandharva', text:'"The riddle hymn to Viśvedevas — philosophical verses exploring the nature of existence."', action: () => { switchBG(bgLibraryOfHymns); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.164'; updateHymnInfo(); } },
		  { who:'Apsara', text:'"What was the tree, what the wood from which they carved heaven and earth? The wise ask, they meditate."', action: () => setSpriteEmotion(apsara, 'serious') },
		  { who:'Gandharva', text:'"Mystery invites contemplation. What riddles does your life present?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.164'); } }
		],
		mandala1_hymn1_165: [
		  { who:'Apsara', text:'"The Maruts again — the storm gods in their power."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.165'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They demonstrate the raw energy that moves the cosmos."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What raw energy moves you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.165'); } }
		],
		mandala1_hymn1_166: [
		  { who:'Apsara', text:'"The Maruts — riders of the storm winds."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.166'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They travel swiftly, bringing both destruction and renewal."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you ride life\'s storms?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.166'); } }
		],
		mandala1_hymn1_167: [
		  { who:'Apsara', text:'"The Maruts — the fierce company of storm gods."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.167'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They move as one, demonstrating the power of unified action."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you act in unity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.167'); } }
		],
		mandala1_hymn1_168: [
		  { who:'Apsara', text:'"The Maruts — the golden-armored storm deities."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.168'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They shine with splendor as they fulfill their cosmic function."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you fulfill your purpose?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.168'); } }
		],
		mandala1_hymn1_169: [
		  { who:'Apsara', text:'"Indra and Maruts — the leader and his storm companions."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.169'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They work together, demonstrating leadership and collective power."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you lead and follow?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.169'); } }
		],
		mandala1_hymn1_170: [
		  { who:'Apsara', text:'"Dialogue with Indra — a conversation with the divine."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.170'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"The seer speaks directly to Indra, seeking understanding and favor."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What conversations do you have with the divine?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.170'); } }
		],
		mandala1_hymn1_171: [
		  { who:'Apsara', text:'"The Maruts — the storm gods in their elemental power."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.171'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They embody the untamed forces of nature that sustain life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you embrace wildness?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.171'); } }
		],
		mandala1_hymn1_172: [
		  { who:'Apsara', text:'"The Maruts — the fierce yet beneficial storm gods."', action: () => { switchBG(bgSkyOfWinds); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.172'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They demonstrate that destruction can lead to renewal."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How has destruction led to renewal in your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showMarutsChoice('1.172'); } }
		],
		mandala1_hymn1_173: [
		  { who:'Apsara', text:'"Indra the establisher — who founds cosmic order."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.173'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He creates the structures that maintain universal harmony."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What do you establish in your world?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.173'); } }
		],
		mandala1_hymn1_174: [
		  { who:'Apsara', text:'"Indra the king — ruler of the divine realm."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.174'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He governs with authority tempered by responsibility."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you exercise authority?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.174'); } }
		],
		mandala1_hymn1_175: [
		  { who:'Apsara', text:'"Indra the strong — whose power is legendary."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.175'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He embodies the strength that upholds cosmic order."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What strength do you embody?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.175'); } }
		],
		mandala1_hymn1_176: [
		  { who:'Apsara', text:'"Indra the generous — who gives without measure."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.176'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"His bounty flows like rivers to those who honor him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you express generosity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.176'); } }
		],
		mandala1_hymn1_177: [
		  { who:'Apsara', text:'"Indra the falcon-borne — who rides the divine bird."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.177'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He travels swiftly between worlds on his celestial mount."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What carries you between worlds?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.177'); } }
		],
		mandala1_hymn1_178: [
		  { who:'Apsara', text:'"Indra the benefactor — who bestows blessings."', action: () => { switchBG(bgIndraThunder1); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.178'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He provides for the needs of those who worship him."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you benefit others?"', action: () => { setSpriteEmotion(apsara, 'happy'); showIndraChoice('1.178'); } }
		],
		mandala1_hymn1_179: [
		  { who:'Apsara', text:'"The dialogue of Agastya and Lopāmudrā — a conversation between husband and wife about spiritual life."', action: () => { switchBG(bgMeditationArea); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.179'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"She speaks of the difficulty of the path, he of the rewards. Together they find balance."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"Relationships are spiritual practice. How do you walk the path with others?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.179'); } }
		],
		mandala1_hymn1_180: [
		  { who:'Apsara', text:'"The Aśvins — the twin healers in their compassion."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.180'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They continue their mission of restoring wholeness to the world."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What compassion do you express?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.180'); } }
		],
		mandala1_hymn1_181: [
		  { who:'Apsara', text:'"The Aśvins — the swift responders to human need."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.181'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They arrive quickly when called, bringing their healing arts."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you respond to need?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.181'); } }
		],
		mandala1_hymn1_182: [
		  { who:'Apsara', text:'"The Aśvins — the restorers of broken things."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.182'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They mend what was damaged, making it whole again."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What have you restored?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.182'); } }
		],
		mandala1_hymn1_183: [
		  { who:'Apsara', text:'"The Aśvins — the healers of body and spirit."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.183'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They address both physical ailments and spiritual suffering."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What healing do you seek?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.183'); } }
		],
		mandala1_hymn1_184: [
		  { who:'Apsara', text:'"The Aśvins — the compassionate twin deities."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.184'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They embody the divine quality of mercy and care."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you express compassion?"', action: () => { setSpriteEmotion(apsara, 'happy'); showAsvinsChoice('1.184'); } }
		],
		mandala1_hymn1_185: [
		  { who:'Apsara', text:'"Heaven and Earth — the divine parents once more."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.185'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They continue their eternal function of sustaining all life."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What sustains your life?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.185'); } }
		],
		mandala1_hymn1_186: [
		  { who:'Apsara', text:'"The Viśvedevas — all gods united in purpose."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.186'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"They demonstrate the power of collective divine action."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"How do you work in unity?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.186'); } }
		],
		mandala1_hymn1_187: [
		  { who:'Apsara', text:'"Food (Anna) — the sustainer of life."', action: () => { switchBG(bgRiverOfDeities); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.187'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"This essential element represents the nourishment that maintains existence."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What truly nourishes you?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.187'); } }
		],
		mandala1_hymn1_188: [
		  { who:'Apsara', text:'"Agni in Aprī hymns — the fire in invocations."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.188'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He is called upon in these special rites to ensure their success."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What special rites do you practice?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.188'); } }
		],
		mandala1_hymn1_189: [
		  { who:'Apsara', text:'"Agni the path-clearer — who removes obstacles."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.189'; updateHymnInfo(); } },
		  { who:'Gandharva', text:'"He makes the way smooth for those who follow the sacred path."', action: () => setSpriteEmotion(gandharva, 'serious') },
		  { who:'Apsara', text:'"What obstacles have you cleared?"', action: () => { setSpriteEmotion(apsara, 'happy'); showHymnChoice('1.189'); } }
		],

    // Generate remaining hymns programmatically
    // Hymns 1.42 to 1.189
    ...Array.from({length: 148}, (_, i) => {
        const hymnNum = i + 42;
        const hymnId = `1.${hymnNum}`;
        const sceneKey = `mandala1_hymn${hymnId.replace('.', '_')}`;
        
        // Determine deity and theme based on hymn number
        const deities = [
            'Agni', 'Indra', 'Varuna', 'Vishnu', 'Ashvins', 'Maruts', 
            'Ushas', 'Surya', 'Rudra', 'Brihaspati', 'Pushan', 'Tvashtr'
        ];
        const themes = [
            'creation', 'protection', 'wisdom', 'healing', 'victory', 
            'order', 'light', 'waters', 'sacrifice', 'meditation'
        ];
        
        const deityIndex = hymnNum % deities.length;
        const themeIndex = hymnNum % themes.length;
        const deity = deities[deityIndex];
        const theme = themes[themeIndex];
        
        // Determine which choice function to use
        let choiceFunc = 'showHymnChoice';
        if (deity === 'Ashvins') choiceFunc = 'showAsvinsChoice';
        else if (deity === 'Indra') choiceFunc = 'showIndraChoice';
        else if (deity === 'Vishnu') choiceFunc = 'showVisnuChoice';
        else if (deity === 'Varuna') choiceFunc = 'showVarunaChoice';
        else if (deity === 'Maruts') choiceFunc = 'showMarutsChoice';
        else if (deity === 'Ushas') choiceFunc = 'showUsasChoice';
        else if (deity === 'Surya') choiceFunc = 'showSuryaChoice';
        
        // Determine background
        const backgrounds = [
            bgAgni, bgRiverOfDeities, bgCosmicBalance, bgGoldenHorizonHalo, 
            bgSkyOfWinds, bgLibraryOfHymns, bgMeditationArea, bgRitualAndOrder
        ];
        const bgIndex = hymnNum % backgrounds.length;
        
        return {
            [sceneKey]: [
                { 
                    who: hymnNum % 2 === 0 ? 'Apsara' : 'Gandharva', 
                    text: `"Hymn ${hymnId} invokes ${deity}, the great deity of ${theme}."`, 
                    action: () => { 
                        switchBG(backgrounds[bgIndex]); 
                        setSpriteEmotion(hymnNum % 2 === 0 ? apsara : gandharva, 'thoughtful'); 
                        state.currentHymn = hymnId; 
                        updateHymnInfo(); 
                    } 
                },
                { 
                    who: hymnNum % 2 === 0 ? 'Gandharva' : 'Apsara', 
                    text: `"Through this verse, we understand the nature of ${theme} in the cosmic order."`, 
                    action: () => setSpriteEmotion(hymnNum % 2 === 0 ? gandharva : apsara, 'serious') 
                },
                { 
                    who: hymnNum % 2 === 0 ? 'Apsara' : 'Gandharva', 
                    text: `"How does ${deity}\'s aspect of ${theme} resonate with your journey?"`, 
                    action: () => { 
                        setSpriteEmotion(hymnNum % 2 === 0 ? apsara : gandharva, 'happy'); 
                        window[choiceFunc](hymnId);
                    } 
                }
            ]
        };
    }).reduce((acc, curr) => ({...acc, ...curr}), {}),
    
    // Final hymns
    mandala1_hymn1_190: [
      { who:'Gandharva', text:'"The 190th hymn — a celebration of the cosmic order that sustains all existence."', action: () => { switchBG(bgCosmicBalance); setSpriteEmotion(gandharva, 'thoughtful'); state.currentHymn = '1.190'; updateHymnInfo(); } },
      { who:'Apsara', text:'"Ṛta manifests in the turning of seasons, the movement of stars, the rhythm of breath."', action: () => setSpriteEmotion(apsara, 'serious') },
      { who:'Gandharva', text:'"How do you participate in the great cosmic dance?"', action: () => { setSpriteEmotion(gandharva, 'happy'); showHymnChoice('1.190'); } }
    ],
    
    mandala1_hymn1_191: [
      { who:'Apsara', text:'"The final hymn — a return to Agni who began this journey, now seen with new understanding."', action: () => { switchBG(bgAgni); setSpriteEmotion(apsara, 'thoughtful'); state.currentHymn = '1.191'; updateHymnInfo(); } },
      { who:'Gandharva', text:'"What began with external fire now burns within — the flame of transformed consciousness."', action: () => setSpriteEmotion(gandharva, 'serious') },
      { who:'Apsara', text:'"You have completed Mandala I. What wisdom will you carry forward?"', action: () => { setSpriteEmotion(apsara, 'happy'); unlockAchievement('flameSeeker'); showMandalaConclusion(); } }
    ],
    
    // Conclusion scenes
    mandala1_conclusion: [
      { who:'Narrator', text:'The flames of Mandala I subside, leaving behind embers of wisdom.', action: () => { switchBG(bgTransition); hideSprite(apsara); hideSprite(gandharva); showSprite(player); } },
      { who:'Apsara', text:'"You have walked the path of fire, Seeker. What burns within you now?"', action: () => { showSprite(apsara); setSpriteEmotion(apsara, 'thoughtful'); } },
      { who:'Gandharva', text:'"The hymns have revealed their secrets to those who listen with both heart and mind."', action: () => { showSprite(gandharva); setSpriteEmotion(gandharva, 'serious'); } },
      { who:'Apsara', text:'"Remember: Agni is not just in the altar fire, but in the light of understanding."', action: () => setSpriteEmotion(apsara, 'happy') },
      { who:'Gandharva', text:'"Carry this flame with you as we prepare for the next Mandala."', action: () => setSpriteEmotion(gandharva, 'thoughtful') },
      { who:'Apsara', text:'"The journey continues, but for now, rest in the warmth of what you have learned."', action: () => setSpriteEmotion(apsara, 'serene') },
      { who:'Narrator', text:'The first Mandala is complete. The fire within you burns brighter now.', action: () => { hideSprite(apsara); hideSprite(gandharva); showPostMandalaChoices(); } }
    ],
    
    mandala1_reflection: [
      { who:'Narrator', text:'You pause to reflect on your journey through Mandala I.', action: () => { switchBG(bgMeditationArea); hideSprite(apsara); hideSprite(gandharva); showSprite(player); } },
      { who:'Player', text:'"What have I truly learned from these hymns?"', action: () => setSpriteEmotion(player, 'thoughtful') },
      { who:'Apsara', text:'"You have learned that fire is both destroyer and creator, both physical and spiritual."', action: () => { showSprite(apsara); setSpriteEmotion(apsara, 'thoughtful'); } },
      { who:'Gandharva', text:'"You have seen how the divine manifests in many forms, yet remains one."', action: () => { showSprite(gandharva); setSpriteEmotion(gandharva, 'serious'); } },
      { who:'Apsara', text:'"Most importantly, you have learned to listen — to the hymns, to the cosmos, to yourself."', action: () => setSpriteEmotion(apsara, 'happy') },
      { who:'Gandharva', text:'"This listening is the beginning of true wisdom."', action: () => setSpriteEmotion(gandharva, 'thoughtful') },
      { who:'Player', text:'"I am ready for what comes next."', action: () => setSpriteEmotion(player, 'determined') },
      { who:'Narrator', text:'Your reflection deepens your understanding. The path ahead awaits.', action: () => { hideSprite(apsara); hideSprite(gandharva); showPostMandalaChoices(); } }
    ]
};

// Expose scenes to global scope
window.scenes = scenes;
console.log('Mandala1.js loaded:', Object.keys(scenes).length, 'scenes');
