document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const analyzeBtn = document.getElementById('analyze-btn');
    const textInput = document.getElementById('text-input');
    const humanCard = document.querySelector('.human-card');
    const aiCard = document.querySelector('.ai-card');
    const humanMeter = document.querySelector('.human-meter');
    const aiMeter = document.querySelector('.ai-meter');
    const humanValue = humanCard.querySelector('.confidence-value');
    const aiValue = aiCard.querySelector('.confidence-value');
    
    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeText);
    
    // Analysis Function (mock for now - would connect to real API in production)
    function analyzeText() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text to analyze');
            return;
        }
        
        // Show loading state
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        analyzeBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // For demo purposes, we'll generate random results
            // In a real app, you would call your detection API here
            const aiProbability = Math.random();
            const humanProbability = 1 - aiProbability;
            
            // Update UI with results
            updateResults(humanProbability, aiProbability);
            
            // Reset button
            analyzeBtn.innerHTML = '<i class="fas fa-robot"></i> Analyze Text';
            analyzeBtn.disabled = false;
        }, 1500);
    }
    
    function updateResults(humanProb, aiProb) {
        // Convert to percentages
        const humanPercent = Math.round(humanProb * 100);
        const aiPercent = Math.round(aiProb * 100);
        
        // Update meter widths
        humanMeter.style.width = `${humanPercent}%`;
        aiMeter.style.width = `${aiPercent}%`;
        
        // Update percentage values
        humanValue.textContent = `${humanPercent}%`;
        aiValue.textContent = `${aiPercent}%`;
        
        // Show result cards with animation
        humanCard.classList.remove('hidden');
        aiCard.classList.remove('hidden');
        
        // Trigger animations
        setTimeout(() => {
            humanCard.classList.add('show');
            aiCard.classList.add('show');
        }, 100);
    }
    
    // Bonus: Add some interactive elements
    textInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    textInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});