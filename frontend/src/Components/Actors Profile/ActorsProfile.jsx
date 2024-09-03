import React, { useState } from 'react';
import './ActorsProfile.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const profileImageBaseUrl = "https://image.tmdb.org/t/p/w500/";
const Api_Key = `41ffedf396cc16675a2bc485b84f084e`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  padding: '8px',
  position: 'relative',
  overflow: 'hidden',
}));

const getGender = (gender) => {
  switch (gender) {
    case 1:
      return 'Female';
    case 2:
      return 'Male';
    case 3:
      return 'Non-binary';
    default:
      return 'Not specified';
  }
};

function ActorsProfile({ actors }) {
  const [flippedActorId, setFlippedActorId] = useState(null);
  const [actorDetails, setActorDetails] = useState({});

  const handleFlip = async (actor) => {
    if (flippedActorId === actor.id) {
      setFlippedActorId(null);
      return;
    }

    if (!actorDetails[actor.id]) {
      const response = await fetch(`https://api.themoviedb.org/3/person/${actor.id}?append_to_response=external_ids&api_key=${Api_Key}`);
      const data = await response.json();
      setActorDetails(prevDetails => ({
        ...prevDetails,
        [actor.id]: {
          ...data,
          external_ids: data.external_ids
        }
      }));
    }

    setFlippedActorId(actor.id);
  };

  return (
    <div className='profiles_main_container'>
      <div className='crew_Actors_Sections'>
        
      </div>
      <Grid container spacing={3}>
        {actors.map((actor, index) => (
          <Grid key={index} xs={12} sm={6} md={3} onClick={() => handleFlip(actor)}>
            <Item className={`item ${flippedActorId === actor.id ? 'flipped' : ''}`}>
              <div className="front">
                <img src={`${profileImageBaseUrl}${actor.profile_path}`} alt={actor.name} />
                <div className='pt2 text-black font-semibold text-lg'>{actor.name}</div>
                <div className='text-sm'>{actor.character || 'Character name not available'}</div>
              </div>
              {flippedActorId === actor.id && (
                <div className="back">
                  {actorDetails[actor.id] ? (
                    <div className='actor-details'>
                      <p>Name: <strong>{actorDetails[actor.id].name}</strong></p>
                      <p>Born: <strong>{actorDetails[actor.id].birthday}</strong></p>
                      <p>Place of Birth: <strong>{actorDetails[actor.id].place_of_birth}</strong></p>
                      <p>Gender: <strong>{getGender(actorDetails[actor.id].gender)}</strong></p>
                      <p>Department Of: <strong>{actorDetails[actor.id].known_for_department}</strong></p>
                      <p>Popularity: <strong className='text-green-600'>{actorDetails[actor.id].popularity.toString().slice(0, 2)}%</strong></p>

                      <div className="social-media-section">
                        <h1>Social Media</h1>
                        <div className="social-buttons-container">
                          {actorDetails[actor.id].external_ids.instagram_id && (
                            <a href={`https://www.instagram.com/${actorDetails[actor.id].external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/instagram-1-svgrepo-com.svg" alt="Instagram" />
                            </a>
                          )}
                          {actorDetails[actor.id].external_ids.facebook_id && (
                            <a href={`https://www.facebook.com/${actorDetails[actor.id].external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/facebook-network-communication-internet-interaction-svgrepo-com.svg" alt="Facebook" />
                            </a>
                          )}
                          {actorDetails[actor.id].external_ids.imdb_id && (
                            <a href={`https://www.imdb.com/name/${actorDetails[actor.id].external_ids.imdb_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/imdb-svgrepo-com.svg" alt="IMDb" />
                            </a>
                          )}
                          {actorDetails[actor.id].external_ids.tiktok_id && (
                            <a href={`https://www.tiktok.com/@${actorDetails[actor.id].external_ids.tiktok_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/tiktok-logo-logo-svgrepo-com.svg" alt="TikTok" />
                            </a>
                          )}
                          {actorDetails[actor.id].external_ids.twitter_id && (
                            <a href={`https://twitter.com/${actorDetails[actor.id].external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/twitter-svgrepo-com.svg" alt="Twitter" />
                            </a>
                          )}
                          {actorDetails[actor.id].external_ids.youtube_id && (
                            <a href={`https://www.youtube.com/user/${actorDetails[actor.id].external_ids.youtube_id}`} target="_blank" rel="noopener noreferrer" className="social-button">
                              <img className='social-icon' src="/youtube-svgrepo-com.svg" alt="YouTube" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              )}
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ActorsProfile;
