import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = props => <div className="home">
  <div className="home__quote">
		<blockquote className="home__blockquote">
			<p>"But please remember: this is only a work of fiction. The truth, as always, will be far stranger."<br />Arthur C. Clarke</p>
		</blockquote>
  </div>
  <div className="home__main">
		<p>Welcome,</p>
		<p>The following demo showcases for the first time a 3D virtual puppet that responds in real time to your smartphone's movements.</p>
		<p>The range of possibilities for games with this new type of interactions is only limited by the author's creativity:</p>
		<p>I imagine social gatherings amongst friends where people can play beer pong without the need for a ping-pong table; card and dice games where there is no need   for actual dice nor cards; where yielding a sword and shield is just a matter or raising one's smartphone and smartwatch; and where anyone can join in simply by synching in w  ith their personal devices.</p>
		<p>I promise to develop games that will provide users with new amazing experiences.</p>
		<p>
			Enjoy: <Link to="/t">Puppet Theater</Link>
		</p>
  </div>
  <div className="home__signature">
		<div>Gorka</div>
		<div>Expect Awesomeness</div>
  </div>
</div>

export default Home
