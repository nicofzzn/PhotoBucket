import React, { useContext } from 'react'
import { Nav, Navbar, Container, Image, Dropdown } from 'react-bootstrap'
import { MdFingerprint } from 'react-icons/md'
import { UserContext } from './App'
import { BiImages, BiFolder, BiArrowFromLeft, BiUpload } from 'react-icons/bi'
import useWindowDimensions from '../hooks/useWindowDimensions'

const Header = () => {
  const [user] = useContext(UserContext)
  const { width } = useWindowDimensions()

  return (
    <Navbar bg='light' expand='sm' className='shadow-sm'>
      <Container>
        <Navbar.Brand href='/'>
          <MdFingerprint size='1.5em' /> PhotoBucket
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {user.id && (
              <>
                <Nav.Link href='#link' id='nav-color'>
                  <BiUpload
                    style={{ marginBottom: '3px' }}
                    className='mr-2'
                    size='1.4rem'
                  />
                  Upload
                </Nav.Link>
                <Dropdown title={user.name} id='basic-nav-dropdown'>
                  <Dropdown.Toggle
                    variant='custom'
                    style={{
                      backgroundColor: 'inherit',
                      border: '0px',
                      padding: '0 0',
                    }}
                  >
                    {user.photo ? (
                      <Image
                        className='dropdown-toggle'
                        style={{
                          width: '40px',
                          height: '40px',
                          marginLeft: '.5rem',
                        }}
                        src={user.photo}
                        roundedCircle
                      />
                    ) : (
                      <Nav.Link href=''>{user.name}</Nav.Link>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='mt-1'>
                    <a
                      style={{ padding: '0 8px' }}
                      className='nav-link'
                      href='/auth/logout'
                    >
                      <BiArrowFromLeft
                        style={{
                          color: '#3a3a3a',
                        }}
                        size='1.4rem'
                      />{' '}
                      Logout
                    </a>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown.Divider />
                {width <= 575 && (
                  <>
                    <Nav.Link href='#link' id='nav-color'>
                      <BiImages
                        style={{ marginBottom: '3px' }}
                        className='mr-2'
                        size='1.4rem'
                      />
                      All Photos
                    </Nav.Link>
                    <Nav.Link href='#link' id='nav-color'>
                      <BiFolder
                        style={{ marginBottom: '3px' }}
                        className='mr-2'
                        size='1.4rem'
                      />
                      Folders
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
