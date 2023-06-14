
import { Box, Button, Modal, Typography } from '@mui/material';
import style from '../src/styles/component/WalletConnection.module.css';
import metamask from '../public/assets/components/logo/MetaMask_Fox 1.svg';
import wallerConnect from '../public/assets/components/logo/WallerConnect 1.svg';
import Image from 'next/image';
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    color: '#ffffff',
};

interface IProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const WalletConnection = ({ open, setOpen }: IProps) => {


    return (<div>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box
                sx={modalStyle}>
                <div className={style.modalContainer}>
                    <p className={style.title}>Connect Your Wallet</p>
                    <div className={style.modalBtn}><Image src={metamask} alt='metamask'></Image> <p>MetaMask</p></div>
                    <div className={style.modalBtn}><Image src={wallerConnect} alt='wallerConnect'></Image> <p>WalletConnect</p></div>
                </div>
            </Box>
        </Modal>
    </div>);
}

export default WalletConnection;