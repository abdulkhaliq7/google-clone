import { Link } from 'react-router-dom';
import React from 'react';
import Response from '../response';
import { useStateValue } from '../StateProvider';
import useGoogleSearch from '../useGoogleSearch';
import './SearchPage.css';
import Search from './Search';
import SearchIcon from '@material-ui/icons/Search'
import DescriptionIcon  from '@material-ui/icons/Description';
import ImageIcon  from '@material-ui/icons/Image';
import LocalOfferIcon  from '@material-ui/icons/LocalOffer';
import RoomIcon  from '@material-ui/icons/Room';
import MoreVertIcon  from '@material-ui/icons/MoreVert';

function SearchPage() {
    const [{term}, dispatch] = useStateValue();

    // Mock API call
    // const data = Response

    // LIVE API CALL
    const { data } = useGoogleSearch(term); 

    console.log(data)

    return (
        <div className='searchPage'>
            <div className="searchPage__header">
                <Link to='/'>
                    <img  
                        className='searchPage__logo'
                        src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
                    />
                </Link>

                <div className="searchPage__headerBody">
                    <Search hideButtons /> 
                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to='/all'>All</Link>
                            </div><div className="searchPage__option">
                                <DescriptionIcon />
                                <Link to='/news'>News</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageIcon />
                                <Link to='/images'>Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon />
                                <Link to='/shopping'>Shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon />
                                <Link to='/maps'>Maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon />
                                <Link to='/more'>More</Link>
                            </div>
                        </div>

                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to='/settings'>Settings</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to='/tools'>Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {term && (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} Seconds) for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className="searchPage_result">
                            <a className='searchPage__resultLink' href="{item.link}">{item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (<img className='searchPage__resultImage' src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src} alt='' /> )} {item.displayLink}</a>
                            <a className='searchPage__resultTitle' href="{item.link}"><h2>{item.title}</h2></a>
                            <p className="searchPage__resultSnippet">{item.snippet}</p>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default SearchPage
