/* Canonical content schema.
   A record is language-neutral; each translation owns its own linguistic metadata. */
const supportedLanguages=['en','de'];
const contentTypes=['vocabulary','phrase','grammar','lesson','category'];
const isPlainObject=value=>value&&typeof value==='object'&&!Array.isArray(value);
function validateTranslationMap(translations,{required=supportedLanguages}={}){
  if(!isPlainObject(translations))return ['translations must be an object'];
  return required.filter(language=>{const value=translations[language];return !isPlainObject(value)||typeof value.text!=='string'||!value.text.trim()}).map(language=>'missing translation: '+language);
}
function validateContentRecord(record,type){
  const errors=[];
  if(!isPlainObject(record))return ['record must be an object'];
  if(typeof record.id!=='string'||!record.id)errors.push('missing id');
  if(type==='category'){if(typeof record.id!=='string'||!record.id)errors.push('missing category id');if(!isPlainObject(record.localized))errors.push('localized must be an object');return errors}
  if(!['vocabulary','phrase'].includes(type)&&record.type!==type)errors.push('type must be '+type);
  if(type==='vocabulary'||type==='phrase')errors.push(...validateTranslationMap(record.translations));
  if(type==='grammar'){if(typeof record.targetLanguage!=='string')errors.push('missing targetLanguage');if(!isPlainObject(record.localized))errors.push('localized must be an object')}
  if(type==='lesson'){if(!Array.isArray(record.activities))errors.push('activities must be an array');if(typeof record.level!=='string')errors.push('missing level');if(!isPlainObject(record.localized))errors.push('localized must be an object');for(const [index,activity] of (record.activities||[]).entries()){if(!isPlainObject(activity)||typeof activity.type!=='string')errors.push('activity['+index+'] must have a type');if(activity.type==='mixed'&&Object.keys(activity).length!==1)errors.push('activity['+index+'] mixed activity cannot have extra fields');if(['vocabulary','verbs','phrases'].includes(activity.type)&&(!Array.isArray(activity.categories)||!activity.categories.length))errors.push('activity['+index+'] categories must be a non-empty array');if(activity.type==='grammar'&&(!Array.isArray(activity.topics)||!activity.topics.length))errors.push('activity['+index+'] topics must be a non-empty array')}}
  return errors;
}
function validateContentSet(content){
  const errors=[];for(const type of contentTypes){for(const [index,record] of (content[type]||[]).entries()){for(const error of validateContentRecord(record,type))errors.push(type+'['+index+'] '+error)}}
  for(const type of contentTypes){const ids=new Set();for(const record of content[type]||[]){if(ids.has(record.id))errors.push(type+' duplicate id: '+record.id);ids.add(record.id)}}return errors;
}
